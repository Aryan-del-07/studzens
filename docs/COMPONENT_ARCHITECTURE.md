# Component Architecture

This document maps out the React component hierarchy of the Studzens frontend.

## Complete Component Tree

```text
App (src/App.tsx)
 ├── AuthProvider (src/contexts/AuthContext.tsx)
 │    └── StudentProfileProvider (src/contexts/StudentProfileContext.tsx)
 │         └── BrowserRouter (react-router-dom)
 │              ├── Routes
 │              │
 │              ├── Public Routes
 │              │    ├── LandingPage
 │              │    ├── LoginPage
 │              │    ├── OnboardingPage
 │              │    └── NotFoundPage
 │              │
 │              └── Protected Routes (Wrapped in ProtectedRoute)
 │                   └── PageShell (Layout Wrapper)
 │                        ├── Top Navigation Bar (Desktop)
 │                        ├── Sidebar Navigation (Desktop)
 │                        ├── Mobile Bottom Navigation Bar (Mobile)
 │                        ├── AICounselorButton (Floating Chat Widget)
 │                        │
 │                        └── <Outlet /> (Renders one of the following based on URL)
 │                             ├── DashboardPage
 │                             │    ├── WelcomeBanner
 │                             │    ├── ExamCountdowns (Pinned Exams)
 │                             │    ├── CollegeRecommendations (Safe, Reach, Reliable)
 │                             │    └── QuickActionsCard
 │                             │
 │                             ├── SearchPage (College Directory)
 │                             │    ├── SearchBar & Filters
 │                             │    └── CollegeGrid
 │                             │         └── CollegeCard
 │                             │
 │                             ├── ComparePage
 │                             │    ├── CollegeSelectorDropdown
 │                             │    └── ComparisonTable (Fees, NIRF, Placements)
 │                             │
 │                             ├── ExamHubPage
 │                             │    ├── MonthlyCalendarWidget
 │                             │    ├── PinnedExamsTimeline
 │                             │    └── ExamDirectory
 │                             │
 │                             ├── ExamDetailsPage
 │                             │    ├── ExamHeader
 │                             │    ├── ImportantDatesTable
 │                             │    └── SyllabusSectors
 │                             │
 │                             ├── CollegeProfilePage
 │                             │    ├── CollegeHero (Images, Name)
 │                             │    ├── QuickStats (Fees, Rating)
 │                             │    ├── PlacementGraph
 │                             │    └── ProgramsList
 │                             │
 │                             ├── MapPage
 │                             │    └── MapLibre Canvas (Rendered via MapLibre GL JS)
 │                             │
 │                             └── ProfilePage
 │                                  ├── UserDetailsForm
 │                                  ├── AcademicPreferences (Stream, Budget)
 │                                  └── DangerZone (Logout, Delete Account)
```

## Component Design Philosophy

1. **Smart vs. Dumb Components:**
   - **Smart Components (Pages):** E.g., `DashboardPage.tsx`. These components use hooks (`useAuth`, `useEffect`) to fetch data, calculate derived state, and manage complex logic.
   - **Dumb Components (UI Blocks):** (Currently being extracted). These accept props and return JSX. E.g., a hypothetical `CollegeCard.tsx` accepts a `college` object and renders it without knowing where the data came from.

2. **Composition over Configuration:**
   - Instead of passing dozens of props into a monolithic `<ComplexTable />`, we favor composing smaller components together to build complex UI views.

3. **Tailwind Utility Classes:**
   - Instead of inline styles or styled-components, all styling is handled via standard Tailwind classes. For highly repetitive patterns (like inputs and cards), custom classes (`.sz-input`, `.sz-card`) are defined in `index.css` using `@apply` to keep the JSX clean.
