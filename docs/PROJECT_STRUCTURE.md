# Project Structure Guide

Studzens is an **npm monorepo** (workspaces) with three independent packages. The overall philosophy borrows from **Feature-Sliced Design** — keep related files close together and only promote things to shared directories when they are truly reused across multiple features.

---

## Top-Level Layout

```
studzens/                        ← monorepo root
├── frontend/                    ← @studzens/frontend  (React 19 + Vite 8)
├── backend/                     ← @studzens/backend   (Express 4 + TypeScript)
├── database/                    ← @studzens/database  (Prisma + seed)
├── docs/                        ← Architecture & flow documentation (25 files)
├── scripts/                     ← Utility scripts
├── dist/                        ← Root-level build output (if any)
├── package.json                 ← Workspace root — defines all three workspaces
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── PROJECT_STRUCTURE.md         ← This file
```

---

## `frontend/` — React SPA

```
frontend/
├── public/
│   ├── logo.png                 ← App logo used in the navbar
│   └── favicon.svg
├── src/
│   ├── main.tsx                 ← Vite entry — mounts <App /> + global providers
│   ├── app/
│   │   └── App.tsx              ← BrowserRouter + all Routes (lazy-loaded pages)
│   │
│   ├── api/
│   │   └── mocks/               ← Static TypeScript datasets (no real API calls yet)
│   │       ├── colleges.ts      ← 100+ Indian colleges with full metadata
│   │       ├── exams.ts         ← 50+ national & state entrance exams
│   │       ├── careers.ts       ← Career paths with required exams & salary data
│   │       ├── gov-colleges.ts  ← Government college subset for map layer
│   │       └── transit-nodes.ts ← Railway stations & airports for transport access
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── ErrorBoundary.tsx ← Global React error boundary
│   │   └── layout/
│   │       └── PageShell.tsx    ← Sticky header + mobile bottom nav + <Outlet />
│   │
│   ├── contexts/                ← Global React Context providers
│   │   ├── AuthContext.tsx      ← Login/logout, isAuthenticated, current user
│   │   ├── BookmarkContext.tsx  ← Saved colleges persisted to localStorage
│   │   ├── NotificationContext.tsx ← In-app toast notifications
│   │   └── StudentProfileContext.tsx ← Onboarding data (stream, marks, exams, budget, states)
│   │
│   ├── features/
│   │   └── authentication/
│   │       └── components/
│   │           └── ProtectedRoute.tsx ← Redirects unauthenticated users to /login
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts   ← Type-safe localStorage hook with JSON parsing
│   │   └── useSearch.ts         ← Debounced search/filter hook for college & exam lists
│   │
│   ├── pages/                   ← Route-level page components (13 total)
│   │   ├── LandingPage.tsx      ← Public marketing page (hero, features, stats, CTA)
│   │   ├── LoginPage.tsx        ← Sign-in / sign-up form
│   │   ├── OnboardingPage.tsx   ← Multi-step profile setup wizard
│   │   ├── DashboardPage.tsx    ← Personalised hub (recommendations, countdowns, bookmarks)
│   │   ├── SearchPage.tsx       ← Filterable college directory
│   │   ├── CollegeProfilePage.tsx ← Full college detail with tabs
│   │   ├── ComparePage.tsx      ← Side-by-side college comparison
│   │   ├── ExamHubPage.tsx      ← Full exam list with filter & calendar
│   │   ├── ExamDetailsPage.tsx  ← Single exam detail view
│   │   ├── CareerExplorerPage.tsx ← Career paths explorer
│   │   ├── MapPage.tsx          ← Interactive MapLibre GL map
│   │   ├── ProfilePage.tsx      ← User profile & preferences editor
│   │   └── NotFoundPage.tsx     ← 404 fallback
│   │
│   ├── styles/
│   │   └── index.css            ← Tailwind 4 import + global tokens + custom classes
│   │                               (.sz-card, .btn-primary, .aurora-mesh, etc.)
│   │
│   ├── types/                   ← Shared TypeScript interfaces
│   │   ├── college.ts           ← College, Program, Placement, Review interfaces
│   │   ├── exam.ts              ← Exam, ExamDate interfaces
│   │   ├── career.ts            ← Career, CareerPath interfaces
│   │   └── user.ts              ← User, Profile, StudentProfile interfaces
│   │
│   └── utils/                   ← Pure helper functions (no React)
│
├── package.json                 ← @studzens/frontend — scripts: dev, build, preview
└── vite.config.ts
```

### Route Map

| Path | Page | Auth Required |
|---|---|---|
| `/` | LandingPage | No |
| `/login` | LoginPage | No |
| `/search` | SearchPage | No |
| `/college/:id` | CollegeProfilePage | No |
| `/exams` | ExamHubPage | No |
| `/exams/:id` | ExamDetailsPage | No |
| `/careers` | CareerExplorerPage | No |
| `/onboarding` | OnboardingPage | ✅ Yes |
| `/dashboard` | DashboardPage | ✅ Yes |
| `/profile` | ProfilePage | ✅ Yes |
| `/compare` | ComparePage | ✅ Yes |
| `/map` | MapPage | ✅ Yes |
| `*` | NotFoundPage | No |

---

## `backend/` — Express API

```
backend/
├── src/
│   ├── index.ts        ← Express app entry: middleware (helmet, cors, json) + routes
│   ├── db.ts           ← Prisma Client singleton
│   └── routes/
│       ├── colleges.ts ← GET /api/colleges
│       ├── users.ts    ← GET + POST /api/users
│       └── reviews.ts  ← GET + POST /api/reviews
├── tsconfig.json
└── package.json        ← @studzens/backend — scripts: dev (tsx watch), build (tsc), start
```

### API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/colleges` | List colleges |
| `GET` | `/api/users` | List users |
| `POST` | `/api/users` | Create user |
| `GET` | `/api/reviews` | List reviews |
| `POST` | `/api/reviews` | Submit review |

---

## `database/` — Prisma Schema & Seed

```
database/
├── prisma/
│   ├── schema.prisma   ← Full data model (see below)
│   └── seed.ts         ← Seeds 100+ colleges, 50+ exams, programs, placements
├── prisma.config.ts    ← Prisma config (DATABASE_URL)
└── package.json        ← @studzens/database — scripts: db:seed, db:push, db:studio
```

### Data Model Summary

| Model | Key Fields |
|---|---|
| `User` | id, email, passwordHash, name, role (STUDENT/ADMIN/MODERATOR) |
| `Profile` | userId, targetStream, targetYear, city, state |
| `College` | id, name, city, state, tier (TIER_1/2/3), ownership, website |
| `Program` | collegeId, name, type (BTECH/MBBS/…), duration, annualFee |
| `Placement` | collegeId, year, avgPackageLpa, highestPackage, placementRate |
| `Exam` | id, name, fullName, level (National/State) |
| `CollegeExam` | join table — college ↔ exam |
| `Review` | userId, collegeId, rating (1–5), content |
| `Bookmark` | userId, collegeId, category (Dream/Target/Safety) |
| `Facility` | collegeId, name, hasFacility, details |

---

## Where Do I Put a New…?

| What you're adding | Where it goes |
|---|---|
| New page / screen | `frontend/src/pages/NewPage.tsx` + add `<Route>` in `App.tsx` |
| Reusable UI component | `frontend/src/components/common/` |
| Feature-specific component | `frontend/src/features/<feature>/components/` |
| Global state | `frontend/src/contexts/NewContext.tsx` |
| Shared custom hook | `frontend/src/hooks/useNewHook.ts` |
| TypeScript type | `frontend/src/types/<domain>.ts` |
| Pure utility function | `frontend/src/utils/<name>.ts` |
| New API route | `backend/src/routes/<resource>.ts` + register in `index.ts` |
| New DB table | Add model to `database/prisma/schema.prisma` + run `prisma db push` |
| Mock data | `frontend/src/api/mocks/<name>.ts` |
