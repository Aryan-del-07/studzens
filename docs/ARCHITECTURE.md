# ARCHITECTURE.md

## System Architecture Overview

Stuzen is a **Single Page Application (SPA)** built with React, TypeScript, and Vite. It uses a **client-side architecture** where all data is stored locally and processed in the browser.

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Browser                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                        React SPA                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │   │
│  │  │   Pages      │  │  Components  │  │   Contexts   │      │   │
│  │  │  (15 pages)  │  │  (Layout,    │  │  (Auth,      │      │   │
│  │  │              │  │   Auth, UI)  │  │   Profile,   │      │   │
│  │  │  Dashboard   │  │              │  │   Theme)     │      │   │
│  │  │  Search      │  │  PageShell   │  │              │      │   │
│  │  │  Compare     │  │  ErrorBoundary│  │  useAuth()   │      │   │
│  │  │  ...         │  │  ProtectedRoute│  │  useStudentProfile()│   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘      │   │
│  │                                                            │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │   │
│  │  │    Hooks     │  │    Utils     │  │    Data      │      │   │
│  │  │  useLocalStorage│  │  collegeIntelligence│  │  colleges.ts │   │
│  │  │  useSearch   │  │  examCommandCenter│  │  exams.ts    │   │
│  │  │              │  │  geo.ts      │  │  careers.ts  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    localStorage Layer                        │   │
│  │  stuzen_auth_user  │  stuzen_profile  │  stuzen_bookmarks     │   │
│  │  stuzen_onboarding_v2│  stuzen-theme    │                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Authentication Flow

```
1. User opens app
2. AuthProvider checks localStorage for stuzen_auth_user
3. If user exists → isAuthenticated = true
4. If no user → redirects to Login page
5. On login → saves user to localStorage + context
6. On logout → clears localStorage + context
7. Onboarding check → if !completed, redirects to Onboarding
```

### Profile Flow

```
1. Student completes Onboarding (4 steps)
2. OnboardingPage calls updateProfile() with all data
3. StudentProfileContext merges data into localStorage (stuzen_profile)
4. DashboardPage reads profile from context
5. DashboardPage calls getDashboardColleges(profile) → returns ranked colleges
6. DashboardPage calls getTodayPriorities(profile) → returns daily tasks
7. Student edits profile on ProfilePage → calls updateProfile() again
```

### Search Flow

```
1. User types in search bar
2. SearchPage applies filters (state, stream, fees, type)
3. SearchPage calls getFilteredColleges(query, filters) → returns filtered list
4. Results displayed as cards
5. User bookmarks a college → BookmarkContext updates + localStorage
6. User selects "Compare" → ComparePage reads selected colleges
```

---

## Component Hierarchy

```
App (Router)
└── ErrorBoundary
    └── PageShell (Layout)
        ├── Header (sticky, desktop nav)
        │   ├── Logo + Brand
        │   ├── Desktop Nav Links (Dashboard, Search, Careers, Exams, AI Help)
        │   └── Profile Icon + Mobile Menu Toggle
        │
        ├── Mobile Header Dropdown (lg:hidden)
        │
        ├── Outlet (Renders matched page)
        │   ├── LandingPage (/)
        │   ├── LoginPage (/login)
        │   ├── OnboardingPage (/onboarding) [protected]
        │   ├── DashboardPage (/dashboard) [protected]
        │   ├── SearchPage (/search)
        │   ├── CollegeProfilePage (/college/:id)
        │   ├── ComparePage (/compare) [protected]
        │   ├── MapPage (/map) [protected]
        │   ├── ExamHubPage (/exams)
        │   ├── ExamDetailsPage (/exams/:id)
        │   ├── CareerExplorerPage (/careers)
        │   ├── AICounselorPage (/counselor) [protected]
        │   ├── ProfilePage (/profile) [protected]
        │   └── NotFoundPage (*)
        │
        └── Mobile Bottom Nav (lg:hidden, fixed bottom)
            ├── Home, Colleges, Map, Compare, Me
```

---

## State Management

### Why React Context (not Redux/Zustand)?

For this app size (~40 source files, ~1,600 lines of state), React Context is sufficient and simpler:

| Context | Purpose | Data |
|---------|---------|------|
| `AuthContext` | Who is logged in | User object, onboarding flag |
| `StudentProfileContext` | Student's academic data | Profile, scores, preferences |
| `BookmarkContext` | Saved colleges | Array of college IDs |
| `NotificationContext` | Toast messages | Array of notification objects |
| `ThemeContext` | Light/dark mode | Theme string, system preference |

### Context Performance Pattern

Each context provider uses `useMemo` to prevent unnecessary re-renders:

```typescript
const value = useMemo(() => ({
  user, isAuthenticated, hasCompletedOnboarding, login, logout, completeOnboarding
}), [user, hasCompletedOnboarding]);
```

Only consumers that use the changed values will re-render.

---

## Routing Architecture

### Route Types

| Type | Routes | Guard |
|------|--------|-------|
| Public | /, /search, /college/:id, /exams, /exams/:id, /careers, /login | None |
| Protected | /dashboard, /onboarding, /profile, /compare, /map, /counselor | ProtectedRoute |
| Layout | All routes | PageShell |

### ProtectedRoute Logic

```typescript
if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} />;
}
return <Outlet />;  // Render the protected page
```

After login, the user is redirected to their originally intended page.

---

## Theme System Architecture

### CSS Custom Properties (Variables)

Instead of 300+ `.dark` override rules, we use a **semantic variable system**:

```css
:root {
  --bg-page: #F6F7FB;
  --bg-surface: #ffffff;
  --text-primary: #0A2540;
  --accent-primary: #635BFF;
  --border-default: #E3E8EF;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.04);
}

.dark {
  --bg-page: #0B1120;
  --bg-surface: #1E293B;
  --text-primary: #F1F5F9;
  --accent-primary: #818CF8;
  --border-default: #334155;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.3);
}
```

Components use these variables:
```css
.sz-card {
  background-color: var(--bg-surface);
  border-color: var(--border-default);
  box-shadow: var(--shadow-card);
}
```

### Backward Compatibility

Old hardcoded Tailwind classes (like `text-[#0A2540]`, `bg-white`) still work via a compatibility layer of `.dark` override rules in the same CSS file. New code should use the CSS variables directly.

---

## Error Handling Architecture

### ErrorBoundary (Global)

Wraps the entire app. Catches any JavaScript error and shows a friendly fallback UI instead of a blank screen.

### Error Handling Strategy

| Layer | Strategy |
|-------|----------|
| **Global** | ErrorBoundary catches all unhandled errors |
| **Routing** | React Router handles 404s with NotFoundPage |
| **Auth** | ProtectedRoute redirects unauthenticated users |
| **Data** | Fallback values and empty states for missing data |
| **Forms** | Inline validation with error messages |

---

## Performance Architecture

### Optimizations Applied

| Technique | Where | Impact |
|-----------|-------|--------|
| `useMemo` | DashboardPage (college scoring, exam filtering, calendar) | Prevents heavy re-computation on every render |
| `useCallback` | DashboardPage (event handlers, date helpers) | Prevents child re-renders from handler recreation |
| `memo` | Notification cards, college cards | Prevents re-renders when parent updates |
| CSS Variables | Global styles | Replaces 300+ override rules with semantic system |
| `prefers-reduced-motion` | All animations | Respects user accessibility preferences |
| ErrorBoundary | App root | Prevents total app crashes from single component errors |

### Future Optimizations

| Technique | Priority | Effort |
|-----------|----------|--------|
| React.lazy() + Suspense | High | Medium |
| Code splitting by route | High | Medium |
| Service Worker + caching | Medium | High |
| Image lazy loading + placeholders | Medium | Low |
| Virtual scrolling for long lists | Medium | Medium |

---

## Security Considerations

### Current Architecture (Demo)

- **Auth:** Simulated (no real backend). User data stored in localStorage.
- **Data:** All data is static JSON files. No API calls.
- **Validation:** Client-side only. No server validation.

### Production Recommendations

1. **Replace localStorage auth** with JWT tokens + HTTP-only cookies
2. **Add API layer** with proper authentication and authorization
3. **Input sanitization** on all user inputs (prevent XSS)
4. **CSRF protection** on all state-changing requests
5. **Rate limiting** on login and search endpoints
6. **HTTPS only** for all communications

---

## Scalability Considerations

### Current Limits

- **Data:** 50 colleges, 15 exams, 12 careers (static JSON)
- **Users:** Single-browser sessions (no server sync)
- **Performance:** All computation on client side

### Scaling Path

1. **Replace static data** with REST/GraphQL API
2. **Add backend** (Node.js/Express or Python/FastAPI)
3. **Add database** (PostgreSQL for relational data, Redis for caching)
4. **Add search engine** (Elasticsearch or Algolia for college search)
5. **Add CDN** for static assets and images

---

## Deployment Architecture

### Current

Static files built by Vite → served by any static file host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

### Recommended Production Stack

```
┌─────────────────────────────────────────┐
│  CDN (Cloudflare) — Static assets, caching│
├─────────────────────────────────────────┤
│  Vercel / Netlify — Frontend hosting    │
├─────────────────────────────────────────┤
│  API Server (Node.js / Python)          │
├─────────────────────────────────────────┤
│  Database (PostgreSQL) + Redis (cache)    │
└─────────────────────────────────────────┘
```

---

*Last updated: June 2026*
