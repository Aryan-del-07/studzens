# FOLDER_STRUCTURE.md

Complete directory tree with descriptions of every file and folder.

```
stuzen/
├── public/                          # Static assets served as-is
│   ├── logo.svg                     # App logo (used in landing page, header)
│   └── ...                          # Other static files
│
├── src/
│   ├── pages/                       # One file per route (15 pages)
│   │   ├── LandingPage.tsx          # Marketing page — public homepage
│   │   ├── LoginPage.tsx            # Authentication (login + signup modes)
│   │   ├── OnboardingPage.tsx      # 4-step profile wizard for new users
│   │   ├── DashboardPage.tsx        # Personalized home (recommendations, exams, calendar)
│   │   ├── SearchPage.tsx           # College search with filters and results
│   │   ├── CollegeProfilePage.tsx   # Detailed view of a single college
│   │   ├── ComparePage.tsx          # Side-by-side college comparison
│   │   ├── MapPage.tsx              # Interactive map with college markers
│   │   ├── ExamHubPage.tsx          # List of all exams with countdowns
│   │   ├── ExamDetailsPage.tsx      # Deep dive into a single exam
│   │   ├── CareerExplorerPage.tsx   # Career options with salary and growth
│   │   ├── AICounselorPage.tsx      # Chat interface for academic guidance
│   │   ├── ProfilePage.tsx          # Edit profile, view bookmarks, tracked exams
│   │   └── NotFoundPage.tsx         # Friendly 404 error page
│   │
│   ├── components/                  # Reusable components shared across pages
│   │   ├── layout/
│   │   │   └── PageShell.tsx        # Main layout: header + mobile nav + content outlet
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx   # Route guard: redirects unauthenticated users
│   │   └── ErrorBoundary.tsx        # Catches JS errors, shows fallback UI
│   │
│   ├── contexts/                    # React Context providers (global state)
│   │   ├── AuthContext.tsx          # User authentication state + onboarding flag
│   │   ├── StudentProfileContext.tsx # Student's academic profile, scores, preferences
│   │   ├── BookmarkContext.tsx      # Saved/bookmarked college IDs
│   │   ├── NotificationContext.tsx  # Toast notifications system
│   │   └── ThemeContext.tsx         # Light/dark/system theme state
│   │
│   ├── hooks/                       # Custom React hooks (reusable logic)
│   │   ├── useLocalStorage.ts       # Syncs state with browser localStorage
│   │   └── useSearch.ts            # Manages search query and focus state
│   │
│   ├── utils/                       # Business logic and helper functions
│   │   ├── collegeIntelligence.ts   # College scoring, filtering, recommendation engine
│   │   ├── examCommandCenter.ts   # Exam readiness, priorities, countdown logic
│   │   └── geo.ts                  # Geographic utilities for the map feature
│   │
│   ├── data/                        # Static data files (colleges, exams, careers)
│   │   ├── colleges.ts              # 50+ college records with full details
│   │   ├── exams.ts                 # 15+ exam records with dates and eligibility
│   │   ├── careers.ts               # 12+ career options with salary and growth
│   │   ├── transit-nodes.ts         # Transit hub data for map feature
│   │   └── gov-colleges.ts          # Government college data subset
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── college.ts               # College, CourseDetail, FacilityDetail types
│   │   ├── exam.ts                  # Exam, ExamPattern, ExamScore types
│   │   ├── career.ts                # Career, CareerCategory, RelatedCourse types
│   │   └── user.ts                  # AuthUser, StudentProfile, AcademicProfile types
│   │
│   ├── App.tsx                      # Root component: router + route definitions
│   ├── main.tsx                     # Entry point: renders App into DOM
│   └── index.css                    # Global styles, CSS custom properties, animations
│
├── index.html                       # HTML entry point (Vite injects scripts here)
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript compiler settings (strict mode)
├── tailwind.config.ts               # Tailwind CSS configuration
├── package.json                     # Dependencies and scripts
├── README.md                        # Project overview and quick start
├── PROJECT_OVERVIEW.md             # Detailed product description and user flows
├── ARCHITECTURE.md                 # System architecture and data flow diagrams
├── FOLDER_STRUCTURE.md             # This file — complete directory tree
├── CODE_EXPLANATION.md             # How key code sections work
├── DEVELOPER_GUIDE.md              # How to develop, extend, and deploy
└── AUDIT_REPORT.md                 # Complete UI/UX/code/performance audit
```

---

## File Count Summary

| Category | Count | Lines (approx) |
|----------|-------|----------------|
| Pages | 15 | ~3,800 |
| Components | 3 | ~400 |
| Contexts | 5 | ~500 |
| Hooks | 2 | ~100 |
| Utils | 3 | ~600 |
| Data | 5 | ~2,000 |
| Types | 4 | ~300 |
| CSS | 1 | ~400 |
| **Total** | **38** | **~8,100** |

---

## Naming Conventions

| Convention | Example | Rule |
|------------|---------|------|
| **Pages** | `DashboardPage.tsx` | PascalCase + `Page` suffix |
| **Components** | `ErrorBoundary.tsx` | PascalCase, descriptive noun |
| **Contexts** | `AuthContext.tsx` | PascalCase + `Context` suffix |
| **Hooks** | `useLocalStorage.ts` | camelCase + `use` prefix |
| **Utils** | `collegeIntelligence.ts` | camelCase, descriptive |
| **Data** | `colleges.ts` | plural noun, lowercase |
| **Types** | `college.ts` | singular noun, lowercase |
| **CSS** | `index.css` | lowercase, `index` for main file |

---

## Where to Add New Code

### Adding a New Page

1. Create `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add nav link in `src/components/layout/PageShell.tsx` (if needed)

### Adding a New Component

1. Create `src/components/YourComponent.tsx`
2. Add file header comment explaining what it does
3. Export and import where needed

### Adding a New Data Type

1. Add to `src/types/` file (or create new one)
2. Import and use in components

### Adding New Static Data

1. Add to `src/data/` file (or create new one)
2. Export and import in components

### Adding a New Hook

1. Create `src/hooks/useYourHook.ts`
2. Follow the `use` prefix convention
3. Export and import in components

---

*Last updated: June 2026*
