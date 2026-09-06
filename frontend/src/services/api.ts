/**
 * src/services/api.ts — Central API client for Studzens DRF Backend
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('access_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
    // Attempt token refresh
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        });
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          localStorage.setItem('access_token', data.access);
          headers['Authorization'] = `Bearer ${data.access}`;
          // Retry original request
          const retryRes = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
          if (!retryRes.ok) {
            const errData = await retryRes.json().catch(() => ({}));
            throw new ApiError(retryRes.status, errData.detail || 'Request failed', errData);
          }
          return retryRes.json();
        }
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.detail || errorData.message || (typeof errorData === 'object' ? JSON.stringify(errorData) : 'Request failed');
    throw new ApiError(response.status, message, errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      request<{ access: string; refresh: string }>('/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: (email: string, name: string, password: string) =>
      request<{ id: string; email: string; name: string }>('/auth/register/', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      }),

    me: () => request<any>('/auth/me/'),

    updateProfile: (data: any) =>
      request<any>('/auth/me/', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },

  // Colleges
  colleges: {
    list: (params?: Record<string, string>) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<{ count: number; next: string | null; previous: string | null; results: any[] }>(
        `/colleges/${queryString}`
      );
    },

    get: (id: string) => request<any>(`/colleges/${id}/`),

    stats: () =>
      request<{
        total_colleges: number;
        avg_package_lpa: number;
        total_exams: number;
        tier_distribution: Record<string, number>;
      }>('/colleges/stats/'),
  },

  // Exams
  exams: {
    list: () => request<{ count: number; results: any[] }>('/exams/'),
    get: (id: string) => request<any>(`/exams/${id}/`),
  },

  // Bookmarks
  bookmarks: {
    list: () => request<any[]>('/bookmarks/'),
    add: (collegeId: string, category: string = 'Target') =>
      request<any>('/bookmarks/', {
        method: 'POST',
        body: JSON.stringify({ college: collegeId, category }),
      }),
    remove: (id: string) =>
      request<any>(`/bookmarks/${id}/`, {
        method: 'DELETE',
      }),
  },

  // Reviews
  reviews: {
    list: (collegeId?: string) => {
      const query = collegeId ? `?college=${collegeId}` : '';
      return request<any[]>(`/reviews/${query}`);
    },
    create: (collegeId: string, rating: number, content: string) =>
      request<any>('/reviews/', {
        method: 'POST',
        body: JSON.stringify({ college: collegeId, rating, content }),
      }),
  },
};
