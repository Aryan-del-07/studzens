# Changelog

All notable changes to this project are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

## [Unreleased]

### Fixed
- **Logo Overlap:** Removed `scale-[1.5]` CSS transform from the navbar logo (`PageShell.tsx`).
  The transform caused the logo to visually overflow the `h-16` sticky header and overlap page content below it.
  Logo is now properly sized with `h-8 md:h-9`.
- **Vite Preview Port Error:** Updated the `preview` npm script in `frontend/package.json` from
  `vite preview` to `vite preview --host 0.0.0.0 --port ${PORT:-4173}`.
  Passing `--port $PORT` via the deployment platform's run command failed because the shell variable
  was not expanded before npm forwarded it to vite — resulting in a `CACError: option --port value is missing`.
- **Timeline Gradient:** Fixed an invalid Tailwind class (`to-indigo-955`) in `ExamHubPage.tsx` that caused text to be unreadable against a transparent/white background fallback.

### Changed
- **Typography:** Global application font changed to `Trebuchet MS`. Removed `Inter` and `Geist` Google Fonts from `index.html`.
- **Landing Page Hero:** Centered the main layout, rewrote hero copy for a more trusted, student-focused tone.
- **Dashboard:** Replaced the "Exam Readiness Score" with a 9-point "Profile Completion" score widget.
- **Exams Page:** Added Google Calendar and Apple Calendar (.ics) export buttons to the Academic Calendar widget. Renamed "Command Center" tabs to "Your Exams".
- **Profile Page Avatar:** Added image upload functionality on hover for the user's avatar.

### Removed
- **Careers Nav:** Removed the "Careers" link from desktop and mobile `PageShell` navigation to reduce clutter.
- **Government & Semi-Government Colleges:** Removed all government-owned colleges (IITs, NITs, IIITs, NLUs, DU, JNU, BHU, AIIMS, MAMC) and Semi-Government entries from the college database. The `Ownership` type now only contains `'Private'`. The `gov-colleges.ts` mock file has been emptied. The Search page filter sidebar no longer shows a "Government" tab.
- **Landing Page Elements:** Removed the floating "Recommendation Categories" card and "Data-driven college recommendations" badge from the Hero section.
- **Dashboard Recommendations:** Removed the full "Best Colleges For You" list from the dashboard, replacing it with a clean shortcut card linking to `/for-you`.
- **Exam Readiness:** Removed the "Preparation Readiness" section from the Exams page.
- **Profile AI Insights:** Removed the AI Insights block from the Profile page Overview tab.

---

## [0.3.0] — 2026-07

### Added
- **Notification System:** `NotificationContext` provides toast-style in-app notifications across all pages.
- **Student Profile Context:** `StudentProfileContext` persists onboarding data (stream, exams, marks, budget, preferred states) globally so any page can read it without prop-drilling.
- **Bookmark Context:** `BookmarkContext` with persistent `localStorage` backing so saved colleges survive a page refresh.
- **Career Explorer Page:** Discover career paths, required entrance exams, and associated colleges.
- **Map Page:** Interactive state-wise college density map built with MapLibre GL and `react-map-gl`.
- **Compare Page:** Side-by-side college comparison with metric highlights.
- **Exam Details Page:** Full detail view for each exam — pattern, eligibility, important dates, counselling.
- **College Profile Page:** Comprehensive college detail with tabs for Overview, Programmes, Placements, Facilities, and Reviews.
- **Mock Datasets:** Rich static data for `colleges.ts` (private colleges only), `exams.ts` (50+ exams), `careers.ts`, and `transit-nodes.ts`.
- **Error Boundary:** Global `ErrorBoundary` component wrapping the entire route tree.
- **Custom Hooks:** `useLocalStorage` and `useSearch` added to `src/hooks/`.

### Changed
- **React 19:** Upgraded from React 18 to React 19.
- **Vite 8 + TypeScript 6:** Upgraded build toolchain.
- **Tailwind CSS 4:** Migrated from Tailwind v3 to v4 (using `@tailwindcss/vite` plugin).
- **React Router v7:** Upgraded routing library.
- **All pages are lazy-loaded** via `React.lazy` + `Suspense` with a branded `PageLoader` spinner.
- **Dashboard UI Redesign:** College recommendations split into three explicit buckets (Best Match, Reliable, Safest) for visual clarity.

---

## [0.2.0] — 2025

### Added
- **Complete Engineering Documentation:** Added `docs/` folder with 25 architecture & flow documents.
- **Scholarship Exams:** KVPY, NTSE, and 3 other national scholarships added to `exams.ts`.
- **Compare Quick Actions:** "Compare Colleges" added to top navigation and dashboard quick actions.
- **Floating AI Counselor:** Relocated from main navigation to a persistent floating action button.
- **Vercel SPA Fix:** Added `vercel.json` to handle 404s on direct route navigation.

### Changed
- **Greeting Logic:** Dashboard greeting uses the user's `name` field instead of raw email.
- **README Redesign:** Overhauled to open-source standards with Mermaid architecture diagram and tech badges.

### Fixed
- **Routing 404s:** Refreshing a protected route on Vercel no longer returns a Not Found error.

---

## [0.1.0] — 2024-05-15

### Added
- Initial release of the React/Vite SPA.
- Basic routing and `AuthContext` implementation.
- Static mock data integration for Colleges and Exams.
- MapLibre GL integration for geographical viewing.
- Backend scaffold: Express + Prisma with `colleges`, `users`, and `reviews` routes.
- Database schema: `User`, `Profile`, `College`, `Program`, `Placement`, `Review`, `Exam`, `Bookmark`, `Facility`.
