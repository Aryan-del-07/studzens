/**
 * AuthContext.tsx — Authentication Context with DRF JWT API Integration
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'moderator';
  avatar?: string;
  profile?: {
    target_stream?: string;
    target_year?: number;
    city?: string;
    state?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  loginWithApi: (email: string, password: string) => Promise<void>;
  registerWithApi: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [onboardingDone, setOnboardingDone] = useState<boolean>(() => {
    return localStorage.getItem('stuzen_onboarding_done') === 'true';
  });

  const refreshUser = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const userData = await api.auth.me();
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role === 'ADMIN' ? 'admin' : 'student',
        profile: userData.profile,
      });
    } catch {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const loginWithApi = async (email: string, password: string) => {
    const tokens = await api.auth.login(email, password);
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    await refreshUser();
  };

  const registerWithApi = async (email: string, name: string, password: string) => {
    await api.auth.register(email, name, password);
    await loginWithApi(email, password);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const completeOnboarding = () => {
    localStorage.setItem('stuzen_onboarding_done', 'true');
    setOnboardingDone(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        hasCompletedOnboarding: onboardingDone,
        loginWithApi,
        registerWithApi,
        logout,
        completeOnboarding,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
