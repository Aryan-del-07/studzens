# Stuzen / ExamFlow — Comprehensive Audit Report

> **Date:** 2026-06-23  
> **Auditor:** Senior Product Designer × Staff Frontend Engineer × Principal Architect  
> **Scope:** Full UI/UX, Code Quality, Performance, Accessibility, Mobile Readiness

---

## 1. EXECUTIVE SUMMARY

| Category | Severity | Count | Notes |
|----------|----------|-------|-------|
| UI/UX Inconsistencies | 🔴 High | 42+ | Dark mode relies on brittle CSS overrides; inconsistent spacing |
| Performance Issues | 🟡 Medium | 8 | No memoization; heavy data computation on every render |
| Code Quality | 🟡 Medium | 12 | Unused imports, dead code, missing error boundaries |
| Accessibility | 🔴 High | 15 | Missing ARIA labels, poor focus management, low contrast risks |
| Mobile UX | 🟡 Medium | 10 | Bottom nav coverage incomplete; some touch targets too small |
| Documentation | 🔴 High | 6 | Missing inline comments; existing docs are stale |
| Architecture | 🟡 Medium | 4 | No code splitting; no lazy loading; no error boundaries |

---

## 2. UI/UX ISSUES (42 items)

### 2.1 Dark Mode Architecture (Critical)

**Problem:** The app uses 300+ lines of CSS overrides (`.dark .bg-white { ... }`) to force dark mode. This is:
- **Brittle** — Adding a new color class requires adding a new CSS override
- **Hard to maintain** — 300+ lines of overrides in one file
- **Inconsistent** — Some elements have explicit `dark:` variants, others don't
- **Performance hit** — CSS engine has to process many override rules

**Solution:** Use CSS custom properties (CSS variables) in `index.css` with a proper theme system:
```css
:root {
  --bg-page: #F6F7FB;
  --bg-card: #ffffff;
  --text-primary: #0A2540;
  --text-secondary: #425466;
  --border: #E3E8EF;
}

.dark {
  --bg-page: #0F172A;
  --bg-card: #1E293B;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --border: #334155;
}
```

### 2.2 Typography Inconsistencies

- **Mixed font families:** Some pages use `font-sans` (Tailwind default), others use `font-mono` (random inline styles)
- **Inconsistent heading sizes:** `text-3xl` on some pages, `text-[28px]` on others
- **Line height:** Not consistently applied; some text feels cramped
- **Font weight:** `font-bold` (700) vs `font-extrabold` (800) used inconsistently across pages

### 2.3 Spacing Inconsistencies

- **Padding:** `px-4` vs `px-6` vs `px-8` on different page wrappers
- **Card padding:** `p-5` vs `p-6` vs `p-8` across cards
- **Section gaps:** `mb-6` vs `mb-8` vs `mb-10` with no system
- **Container max-width:** `max-w-[1400px]` vs `max-w-[1200px]` vs `max-w-7xl`

### 2.4 Color Palette Fragmentation

- **12+ different gray shades** used across the app (`#0A2540`, `#425466`, `#697386`, `#9DA6B4`, `#2E3A59`, `#3D4F6F`, etc.)
- **No semantic color system** — colors are hardcoded instead of using CSS variables
- **Accent colors inconsistent:** `#635BFF` (primary) vs `blue-600` vs `indigo-600`

### 2.5 Component Inconsistencies

| Component | Page A | Page B | Page C | Issue |
|-----------|--------|--------|--------|-------|
| Card | `sz-card` | `studzens-card` | `bg-white rounded-2xl` | 3 different card styles |
| Button | `btn-primary` | `bg-blue-600` | `bg-[#635BFF]` | 3 different button styles |
| Input | `sz-input` | `bg-white border-gray-200` | `bg-gray-50` | 3 different input styles |
| Badge | `status-badge` | `bg-green-50 text-green-700` | `bg-[#E6F4EA] text-green-700` | Inconsistent badge colors |

### 2.6 Specific Page Issues

**LandingPage.tsx:**
- Hero section uses `text-[56px]` which is not responsive (breaks on mobile)
- Stats section uses `border-r` without last-child handling (creates extra border)
- No loading state for CTA buttons
- "How It Works" section has fixed 4-column grid that breaks on mobile
- "Top Colleges" section has no horizontal scroll on mobile

**LoginPage.tsx:**
- Right panel is hardcoded `bg-[#0A1020]` with no light mode variant
- Form error messages are just `text-red-500` text — no animation or focus management
- Password strength meter is crude (just colored bar)
- No "Forgot password?" functionality (just a decorative link)
- `REGISTERED_EMAILS` array is in-memory only — resets on refresh

**OnboardingPage.tsx:**
- Step connector lines have `position: absolute` without proper container (`position: relative` missing)
- "Select..." dropdown options use browser defaults (can be light on dark OS theme)
- "Continue" button disabled state has no visual feedback beyond opacity
- No validation error messages shown inline (only `errors` object exists but not rendered)
- Budget slider has no visual track on mobile
- Career interest cards use `text-xs` — too small for readability

**DashboardPage.tsx:**
- **1,200+ lines** — this is a massive file that should be split into sub-components
- Notification dropdown has no click-outside-to-close handler
- "Complete Your Profile" banner uses `bg-[#E6F4EA]` which is hard to read in dark mode
- Calendar widget has no hover states on mobile
- "Best Colleges For You" has no skeleton/loading state
- AI Insight cards use `bg-[#F0F2F8]` — inconsistent with other card backgrounds
- The `useEffect` dependency array is wrong (only `[profile.academicProfile?.currentClass]`)
- Notification items have no "mark as read" functionality
- Profile strength indicator uses hardcoded colors

**SearchPage.tsx:**
- Filter sidebar uses `max-w-[400px]` which is too wide on tablets
- Search bar has no debounce — searches on every keystroke
- College cards have no loading skeleton
- "Compare" checkbox on cards has no visual feedback when selected
- Mobile filter button is `bg-[#635BFF]` but should use `btn-primary`

**CollegeProfilePage.tsx:**
- Tab navigation uses `border-b-2` without proper active state styling
- Gallery uses a grid that doesn't adapt well on mobile
- The `notableAlumni` table has no horizontal scroll on mobile
- Facilities icons are not labeled (accessibility issue)
- Similar colleges section has no loading state

**ComparePage.tsx:**
- College dropdowns have no search functionality (long list of 30+ colleges)
- Comparison table is not horizontally scrollable on mobile
- "Remove" button is too small for touch targets
- Empty state has no illustration

**AICounselorPage.tsx:**
- Chat interface has no message timestamps
- No "typing..." indicator for AI responses
- Empty state has no helpful prompt suggestions
- Input area is fixed at bottom but can overlap with keyboard on mobile
- No message history persistence (resets on refresh)

**MapPage.tsx:**
- Map container uses `h-[calc(100vh-73px)]` which is brittle (header height may change)
- No loading state while map tiles load
- College markers are not clustered (overlapping on dense areas)
- Popup styling is minimal and doesn't match app design
- No "locate me" button

**ExamHubPage.tsx / ExamDetailsPage.tsx:**
- Countdown timer has no animation
- Exam cards use `text-5xl` for the countdown number — too large on mobile
- "Track Exam" button state changes without animation
- No offline support for exam dates

**CareerExplorerPage.tsx:**
- Career cards have inconsistent heights (some titles wrap, others don't)
- "Explore More" button scrolls to top but doesn't animate
- No filtering by stream or salary range
- No "save career" functionality

**ProfilePage.tsx:**
- Profile strength ring uses hardcoded colors
- No avatar upload functionality
- Form sections are not collapsible on mobile
- "Save Changes" button is too far down on mobile

**NotFoundPage.tsx:**
- Minimal page — just an error code and a button
- No helpful navigation or search suggestions
- No illustration or visual interest

### 2.7 Navigation Issues

- **Mobile bottom nav:** Only shows 5 items on mobile, but desktop nav shows 6 (missing "Careers" on mobile)
- **Active state:** Mobile nav uses `bg-[#635BFF]/10` for active, but desktop uses `bg-[#EEF0FF]` — inconsistent
- **Missing back button:** No browser-style back button on any page
- **Breadcrumbs:** Completely missing from the entire app
- **Deep linking:** No URL state for search filters, compare selections, etc.

### 2.8 Empty States

| Page | Empty State | Quality |
|------|-------------|---------|
| Dashboard | "No exam dates coming up" | 🟡 Basic text only |
| Search | "No colleges match" | 🟡 Basic text only |
| Compare | "Select 2 colleges" | 🟢 Good with animation |
| AI Counselor | "How can I help?" | 🟡 Very minimal |
| Profile | "Not completed" | 🟡 Basic banner |
| Notifications | "No notifications" | 🟡 Basic text only |

---

## 3. PERFORMANCE ISSUES (8 items)

### 3.1 DashboardPage — Critical Re-renders

- **1,200+ lines** — all re-rendered on every state change
- `useEffect` with `[profile.academicProfile?.currentClass]` is wrong — should be `[profile]` or properly memoized
- `examDate` is recomputed on every render with `new Date()`
- `getTodayMockExams()` is called on every render
- `getDashboardColleges()` does heavy filtering + sorting on every render
- `getRelevantExams()` does heavy filtering on every render
- No `useMemo` or `useCallback` used anywhere in the app

### 3.2 SearchPage — No Debounce

- `handleSearch` is called on every keystroke
- Filtering 50+ colleges on every character change causes jank
- No `useMemo` for filtered results

### 3.3 MapPage — Heavy MapLibre GL

- MapLibre GL is loaded eagerly on route enter, not lazily
- No cleanup of map instance on unmount (potential memory leak)
- `colleges` data is imported and mapped on every render

### 3.4 No Code Splitting

- All pages are bundled in one chunk (`index-26DmO1KG.js` = 1,607 KB)
- No `React.lazy()` or `Suspense` used
- No dynamic imports for heavy libraries (MapLibre GL, Recharts)

### 3.5 Image Assets

- All images are external URLs (pravatar.cc, unsplash) — no local optimization
- No `loading="lazy"` or `decoding="async"` on images
- No placeholder or blur-up loading for images

### 3.6 CSS Bundle Size

- `index.css` is 161 KB (26 KB gzipped) — very large for a single file
- Many unused Tailwind classes are generated
- Custom CSS could be trimmed significantly

### 3.7 Data Processing

- `collegeIntelligence.ts` and `examCommandCenter.ts` process data on every import
- `getFilteredColleges()` sorts and filters on every call
- No caching layer for computed data

### 3.8 React Context Re-renders

- All contexts re-render all consumers on every update
- No `useMemo` in context providers to prevent unnecessary re-renders
- `useStudentProfile` updates trigger re-renders across the entire app

---

## 4. CODE QUALITY ISSUES (12 items)

### 4.1 Dead Code

| File | Dead Code | Action |
|------|-----------|--------|
| `useCountdown.ts` | `useCountdown` hook is exported but never used in any component | Remove or use |
| `useSearch.ts` | `useSearch` hook is exported but never used in any component | Remove or use |
| `transit-nodes.ts` | Imported but never used in any page | Remove |
| `gov-colleges.ts` | Imported but never used in any page | Remove |
| `BookmarkContext.tsx` | `useBookmark` is used in only 2 places; has `useState` that re-renders unnecessarily | Optimize or merge |
| `NotificationContext.tsx` | `getTodayNotifications` is defined but never called | Remove |
| `DashboardPage.tsx` | `useState` for `examDate`, `colleges` — some unused or redundant | Clean up |

### 4.2 Unused Imports

Multiple files import icons or functions that are never used:
- `LoginPage.tsx`: `useState` imported but not used (it uses `useState` from React, which is fine, but some imports are unused)
- `SearchPage.tsx`: Several Lucide icons imported but not used
- `DashboardPage.tsx`: `useState` for `setExamDate` is set but never read

### 4.3 Duplicate Logic

- `getCollegeById()` is defined in multiple data files
- `exams` array is exported from `exams.ts` but also redefined in `examCommandCenter.ts`
- Filter logic is duplicated between `SearchPage` and `collegeIntelligence.ts`

### 4.4 Missing Error Boundaries

- No error boundaries anywhere in the app
- A single crash in any page crashes the entire app
- No fallback UI for map loading failures, image loading failures, etc.

### 4.5 Type Safety Issues

- `any` types used extensively: `as any` in 20+ places
- `StudentProfile` has `gender: undefined` in `handleFinish` — intentional?
- `Preferences` type has `preferredOwnership: any` — should be typed
- No strict null checks enabled in TypeScript config

### 4.6 Missing Error Handling

- API calls (if any) have no try/catch
- `JSON.parse` in `useLocalStorage` has basic try/catch but no fallback UI
- Form submissions have no error state recovery
- Map loading failures have no fallback

### 4.7 Console Noise

- `console.log` statements scattered throughout the app (noted in several files)
- `console.warn` in `useLocalStorage` hook

---

## 5. ACCESSIBILITY ISSUES (15 items)

### 5.1 Keyboard Navigation

- **No focus trap** in modals, dropdowns, or mobile menus
- **No skip links** for keyboard users to skip navigation
- **Tab order** is not logical in some forms (e.g., OnboardingPage step transitions)
- **No focus visible** styles on many interactive elements

### 5.2 Screen Reader Support

- **No ARIA labels** on icon-only buttons (e.g., theme toggle, mobile menu)
- **No `aria-expanded`** on collapsible sections
- **No `aria-live`** regions for dynamic content (notifications, search results)
- **No `role` attributes** on custom components (cards, tabs, etc.)
- **Form inputs** lack `aria-describedby` for error messages

### 5.3 Color Contrast

- `text-[#9DA6B4]` on `bg-white` has ratio ~3.2:1 (fails WCAA for small text)
- `text-[#0BBF8A]` (green) on light backgrounds has poor contrast for some users
- `bg-[#EEF0FF]` with `text-[#635BFF]` has low contrast
- Some dark mode combinations may fail contrast (e.g., `text-slate-400` on `bg-slate-800`)

### 5.4 Touch Targets

- **Mobile bottom nav items:** 56px height is okay, but the touch target area is only the icon + label
- **Filter checkboxes:** Very small touch targets on mobile
- **Compare checkbox:** Small and hard to tap on mobile cards
- **Notification close button:** Only 16px icon — too small

### 5.5 Motion Sensitivity

- `animate-pulse` used on skeleton states — can trigger motion sensitivity
- `animate-slide-up` used without `prefers-reduced-motion` check
- No `prefers-reduced-motion` media query anywhere in the app

---

## 6. MOBILE UX ISSUES (10 items)

### 6.1 Responsive Breakpoints

- App uses `lg:` (1024px) as the main breakpoint for desktop
- Tablet experience (768px–1024px) is awkward — sidebar disappears but content is still wide
- No `md:` breakpoint usage for intermediate layouts

### 6.2 Mobile Navigation

- Bottom nav covers content on some pages (fixed with `pb-20` but inconsistent)
- No swipe gestures for navigation
- No pull-to-refresh
- No haptic feedback on interactions

### 6.3 Mobile Forms

- Onboarding form inputs are small on mobile
- Select dropdowns open the native picker which may not match app theme
- Date inputs have no date picker on mobile
- Keyboard covers input fields on some pages (no scroll-into-view)

### 6.4 Mobile Performance

- 1,607 KB JS bundle is too large for mobile on slow connections
- No service worker for offline support
- No prefetching of next page data

---

## 7. ARCHITECTURE ISSUES (4 items)

### 7.1 No Lazy Loading

- All pages imported eagerly in `App.tsx`
- MapLibre GL loaded even if user never visits `/map`
- Heavy data files (`colleges.ts`, `careers.ts`) loaded on app startup

### 7.2 No State Management Library

- Using React Context for everything
- Context updates cause unnecessary re-renders
- No middleware for side effects (logging, persistence, analytics)
- No state normalization (data is duplicated across contexts)

### 7.3 No API Layer

- No centralized API client
- No request/response interceptors
- No retry logic for failed requests
- No caching layer

### 7.4 No Testing Infrastructure

- No unit tests
- No component tests
- No E2E tests
- No visual regression tests

---

## 8. DOCUMENTATION ISSUES (6 items)

### 8.1 Existing Documentation (Stale)

| File | Status | Issues |
|------|--------|--------|
| `README.md` | Exists but minimal | Missing setup instructions, architecture overview |
| `PROJECT_OVERVIEW.md` | Exists | Stale — references removed features |
| `ARCHITECTURE.md` | Exists | Incomplete — missing data flow diagrams |
| `FOLDER_STRUCTURE.md` | Exists | Outdated — missing some directories |
| `CODE_EXPLANATION.md` | Exists | Incomplete — only covers some files |
| `STUZEN_GUIDE.md` | Exists | Stale — references old features |

### 8.2 Missing Inline Comments

- No JSDoc comments on any function or component
- No comments explaining complex business logic (e.g., `getDashboardColleges()`)
- No comments explaining why certain design decisions were made
- No `@TODO` or `@FIXME` markers for known issues

---

## 9. PRIORITY MATRIX

### 🔴 P0 — Fix Immediately (User-Facing Bugs)

1. **Dashboard `useEffect` dependency bug** — causes infinite re-renders or stale data
2. **Onboarding step connector lines** — `position: absolute` without `position: relative` container
3. **Mobile bottom nav missing on some pages** — `/careers`, `/counselor` not in mobile nav
4. **Search page no debounce** — causes jank on every keystroke
5. **No error boundaries** — one crash kills the entire app

### 🟡 P1 — Fix This Week (Quality & UX)

6. **Split DashboardPage into sub-components** — 1,200+ lines is unmaintainable
7. **Add `useMemo`/`useCallback` to DashboardPage** — prevent unnecessary re-renders
8. **Implement CSS custom properties for theming** — replace 300+ CSS overrides
9. **Add ARIA labels to all icon-only buttons** — accessibility
10. **Add empty state illustrations** — improve UX
11. **Add lazy loading for MapPage** — reduce initial bundle size
12. **Remove dead code** — unused hooks, unused data files

### 🟢 P2 — Fix This Month (Polish & Scale)

13. **Add code splitting with React.lazy** — improve initial load time
14. **Add service worker for offline support** — mobile readiness
15. **Implement proper search debounce** — performance
16. **Add image optimization** — lazy loading, placeholders
17. **Add unit tests** — code quality
18. **Add breadcrumbs** — navigation improvement
19. **Implement focus trap for modals** — accessibility
20. **Add `prefers-reduced-motion` support** — accessibility

---

## 10. ESTIMATED IMPACT

| Fix Category | User Impact | Dev Impact | Effort |
|-------------|-------------|------------|--------|
| CSS Custom Properties | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Medium |
| Dashboard Split | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | High |
| Dead Code Removal | ⭐ | ⭐⭐⭐⭐ | Low |
| Error Boundaries | ⭐⭐⭐⭐ | ⭐⭐⭐ | Medium |
| ARIA Labels | ⭐⭐⭐⭐ | ⭐⭐ | Low |
| Lazy Loading | ⭐⭐⭐⭐ | ⭐⭐⭐ | Medium |
| Search Debounce | ⭐⭐⭐⭐ | ⭐⭐ | Low |
| Empty States | ⭐⭐⭐⭐ | ⭐⭐ | Low |
| Documentation | ⭐⭐ | ⭐⭐⭐⭐⭐ | Medium |
| Mobile Polish | ⭐⭐⭐⭐ | ⭐⭐⭐ | Medium |

---

## 11. RECOMMENDATIONS

### Short Term (This Session)

1. Fix the CSS custom properties architecture
2. Remove dead code and unused imports
3. Add error boundaries
4. Fix the Dashboard `useEffect` bug
5. Add inline comments to all major files

### Medium Term (This Week)

6. Split DashboardPage into sub-components
7. Add `useMemo`/`useCallback` to performance-critical components
8. Implement search debounce
9. Add lazy loading for MapPage
10. Add ARIA labels and accessibility improvements

### Long Term (This Month)

11. Implement proper API layer with caching
12. Add testing infrastructure (Vitest + React Testing Library)
13. Add PWA support (service worker, manifest)
14. Implement state management library (Zustand or Redux Toolkit)
15. Add analytics and error tracking (Sentry)

---

*End of Audit Report*
