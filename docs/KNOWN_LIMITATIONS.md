# Known Limitations & Technical Debt

This document tracks intentional trade-offs and areas of the codebase that require future refactoring.

## 1. Mock Authentication
**Status:** The current authentication system relies entirely on `localStorage` and React Context.
**Impact:** If a user clears their browser cache or switches devices, their profile data and pinned exams are lost.
**Action Plan:** Implement full JWT authentication on the Express backend and migrate User Profile state to the Postgres database.

## 2. Hardcoded API Mock Data
**Status:** The application currently imports raw TypeScript objects (`src/api/mocks/colleges.ts`) instead of fetching from an API.
**Impact:** The initial JavaScript bundle size is bloated (the `colleges` chunk is over 200KB).
**Action Plan:** Transition to `axios` fetching from the Express API endpoints.

## 3. Large Bundle Size Warning
**Status:** Vite is throwing a warning that some chunks are larger than 500kB after minification (e.g., `MapPage.tsx` integrating MapLibre GL).
**Impact:** Initial load time on slow 3G networks may be impacted.
**Action Plan:** Implement `React.lazy()` and dynamic imports for heavy routes like the Map Page and Compare Page so they are only loaded when requested.

## 4. Mobile Map Performance
**Status:** The MapLibre GL implementation is heavy and can drop frames on older mobile devices.
**Action Plan:** Implement a "Lite Mode" for mobile that replaces the interactive map with static map tiles unless explicitly interacted with.
