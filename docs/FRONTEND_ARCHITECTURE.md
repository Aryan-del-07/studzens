# Studzens — Frontend Architecture

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI rendering |
| Vite | 8 | Dev server + bundler |
| TypeScript | 6 | Static typing |
| Tailwind CSS | 4 | Utility-first styling (via `@tailwindcss/vite`) |
| React Router | 7 | Client-side routing |
| MapLibre GL | 5 | Interactive map rendering |
| react-map-gl | 8 | React wrapper for MapLibre |
| lucide-react | 1 | Icon set |

---

## Directory Structure

```
frontend/src/
├── main.tsx                     ← Vite entry, mounts providers + <App />
├── app/App.tsx                  ← Route tree (all 13 pages, lazy-loaded)
│
├── api/mocks/                   ← Static datasets (no live API calls yet)
│   ├── colleges.ts              ← 100+ colleges
│   ├── exams.ts                 ← 50+ exams
│   ├── careers.ts               ← Career paths
│   ├── gov-colleges.ts          ← Government colleges subset
│   └── transit-nodes.ts         ← Airports & railway stations
│
├── components/
│   ├── common/ErrorBoundary.tsx ← Catches render errors globally
│   └── layout/PageShell.tsx     ← Sticky nav + mobile bottom bar + <Outlet />
│
├── contexts/
│   ├── AuthContext.tsx           ← isAuthenticated, user, login(), logout()
│   ├── BookmarkContext.tsx       ← bookmarks[], addBookmark(), removeBookmark()
│   ├── NotificationContext.tsx  ← notify(), notifications[]
│   └── StudentProfileContext.tsx ← profile (stream, marks, exams, budget, states)
│
├── features/authentication/
│   └── components/ProtectedRoute.tsx
│
├── hooks/
│   ├── useLocalStorage.ts       ← Type-safe persistent state
│   └── useSearch.ts             ← Debounced filter/search hook
│
├── pages/                       ← 13 route-level pages (see route map)
│
├── styles/index.css             ← Tailwind 4 + global design tokens
│
├── types/
│   ├── college.ts
│   ├── exam.ts
│   ├── career.ts
│   └── user.ts
│
└── utils/                       ← Pure helper functions
```

---

## Component Hierarchy

```
<main.tsx>
  <AuthProvider>
    <BookmarkProvider>
      <NotificationProvider>
        <StudentProfileProvider>
          <App>                         ← BrowserRouter + ErrorBoundary + Suspense
            <Routes>
              <Route element={<PageShell />}>
                ├── / → <LandingPage />
                ├── /login → <LoginPage />
                ├── /search → <SearchPage />
                ├── /college/:id → <CollegeProfilePage />
                ├── /exams → <ExamHubPage />
                ├── /exams/:id → <ExamDetailsPage />
                ├── /careers → <CareerExplorerPage />
                └── <ProtectedRoute>
                    ├── /onboarding → <OnboardingPage />
                    ├── /dashboard → <DashboardPage />
                    ├── /profile → <ProfilePage />
                    ├── /compare → <ComparePage />
                    └── /map → <MapPage />
```

---

## Navigation & Layout

`PageShell.tsx` is the single layout shell for every route. It renders:

1. **Sticky header** (`z-50`, `bg-white/90`, `backdrop-blur-md`)
   - Left: Desktop nav links (only shown when authenticated and not on landing page)
   - Center: Logo (absolutely positioned, `h-8 md:h-9`, no scale transform)
   - Right: Profile icon + hamburger (mobile only)
2. **Mobile dropdown menu** (slides down on hamburger click)
3. **`<Outlet />`** — where the current page renders
4. **Mobile bottom tab bar** (fixed, `z-9999`, only shown when authenticated)

The nav is hidden entirely on `/login` and `/onboarding` for a distraction-free experience.

---

## Styling System

`index.css` defines the following custom class utilities on top of Tailwind 4:

| Class | Usage |
|---|---|
| `.btn-primary` | Black filled CTA button with hover lift |
| `.btn-secondary` | Outlined ghost button |
| `.sz-card` | White rounded-2xl card with subtle border shadow |
| `.sz-chip-gray` | Small pill label (gray background) |
| `.aurora-mesh` | CSS gradient mesh background animation |
| `.glass-light` | Frosted-glass card (white/80 + backdrop-blur) |
| `.animate-slide-up` | Keyframe fade-in from below |

---

## Data Flow

```
User Action
    ↓
Page Component (e.g. SearchPage)
    ↓
Reads from: contexts / mock data / local state
    ↓
Filters via: useSearch hook / useMemo
    ↓
Renders via: shared components (sz-card, etc.)
    ↓
Side effects: BookmarkContext.addBookmark() / NotificationContext.notify()
```

---

## Build & Scripts

```sh
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # tsc -b && vite build → /dist
npm run preview  # vite preview --host 0.0.0.0 --port ${PORT:-4173}
npm run lint     # ESLint
```
