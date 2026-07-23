# Stuzen — Project Ownership & Developer Guide

This guide is designed to help you edit, expand, and maintain Stuzen without breaking existing features. It maps out every file in the codebase, detailing its dependencies, who imports it, and whether it is safe to edit.

---

## 🚦 Modification Safety Guide

We classify files into three editing safety levels:
- **✅ Yes (Safe to Edit):** Standalone page components. Safe to change layouts, add buttons, or rewrite styles.
- **⚠️ Caution (Medium Risk):** Central contexts and hooks. Changes to method parameters or keys will impact multiple files.
- **🛑 No (High Risk / Core Framework):** Database files and routing configs. Editing these requires update-checking across the entire system.

---

## 📄 File Registry & Impact Map

### 1. Root & Shell Components

#### `App.tsx`
- **Purpose:** Core Router configuration mapping paths to page views.
- **Dependencies:** React Router, `ProtectedRoute`, all Page components.
- **Used By:** `main.tsx`
- **Safe To Edit?** ⚠️ **Caution**.
- **Risks:** Adding new sub-paths is safe, but removing routes or rearranging wrapper tags can break navigation.

#### `PageShell.tsx`
- **Purpose:** Defines global frame layout (Header, bottom navigation bar).
- **Dependencies:** `useAuth`, Lucide React, React Router.
- **Used By:** `App.tsx`
- **Safe To Edit?** ✅ **Yes**.
- **Risks:** Styling changes are safe. Changing links requires matching router paths.

---

### 2. Contexts (State Layer)

#### `AuthContext.tsx`
- **Purpose:** Global authentication session provider.
- **Dependencies:** `useLocalStorage.ts`.
- **Used By:** `main.tsx`, `ProtectedRoute.tsx`, `LoginPage.tsx`, `PageShell.tsx`.
- **Safe To Edit?** ⚠️ **Caution**.
- **Risks:** Changing the `AuthUser` object structure requires changing how profile and onboarding variables are parsed.

#### `StudentProfileContext.tsx`
- **Purpose:** Manages student academic metrics, board marks, stream target preferences.
- **Dependencies:** `useLocalStorage.ts`, `user.ts` types.
- **Used By:** `main.tsx`, `DashboardPage.tsx`, `OnboardingPage.tsx`, `ProfilePage.tsx`, `ExamHubPage.tsx`.
- **Safe To Edit?** ⚠️ **Caution**.
- **Risks:** Modifying profile fields (e.g. `marks12`) requires updating onboarding forms and validation rules.

#### `BookmarkContext.tsx`
- **Purpose:** Handles saved college states.
- **Dependencies:** `useLocalStorage.ts`.
- **Used By:** `main.tsx`, `SearchPage.tsx`, `CollegeProfilePage.tsx`, `DashboardPage.tsx`.
- **Safe To Edit?** ✅ **Yes**.
- **Risks:** Low risk. Ensure type categories ('Dream', 'Target', 'Safe') remain aligned.

---

### 3. Static Datasets (Data Layer)

#### `colleges.ts` / `gov-colleges.ts`
- **Purpose:** Databases containing college profiles (fees, coordinates, entrance exams accepted).
- **Dependencies:** `college.ts` types.
- **Used By:** `SearchPage.tsx`, `CollegeProfilePage.tsx`, `ComparePage.tsx`, `MapPage.tsx`, `LandingPage.tsx`.
- **Safe To Edit?** 🛑 **No**.
- **Risks:** Modifying college object layouts (like removing `entranceExams` arrays) will trigger TypeScript compiler errors across multiple search and details pages.

#### `exams.ts`
- **Purpose:** Schedule dates and checklist structures for entrance exams.
- **Dependencies:** `exam.ts` types.
- **Used By:** `ExamHubPage.tsx`, `ExamDetailsPage.tsx`, `DashboardPage.tsx`.
- **Safe To Edit?** 🛑 **No**.
- **Risks:** Adding new exams is safe. Changing existing exam IDs (like `'jee-main'`) breaks dashboard command center countdown timers.

---

### 4. Interactive Pages (UI Layer)

#### `DashboardPage.tsx`
- **Purpose:** The Command Center dashboard containing checklists and pinned exams.
- **Dependencies:** `StudentProfileContext`, `BookmarkContext`, `NotificationContext`, `examCommandCenter.ts`.
- **Used By:** `App.tsx`
- **Safe To Edit?** ✅ **Yes**.
- **Risks:** Safe to style or add widgets. Do not break priorities lists or readiness score calculations.

#### `CollegeProfilePage.tsx`
- **Purpose:** Tabbed college profiles showing cost sliders, transit nodes, reviews, and Q&As.
- **Dependencies:** `collegeIntelligence.ts`, `BookmarkContext`, React Router.
- **Used By:** `App.tsx`
- **Safe To Edit?** ✅ **Yes**.
- **Risks:** Safe to expand or style. Make sure all hooks at the top remain unconditional (do not add early returns before hooks).

#### `SearchPage.tsx`
- **Purpose:** College search index page with sort filters.
- **Dependencies:** `colleges.ts`, `BookmarkContext`, `useSearch.ts`.
- **Used By:** `App.tsx`
- **Safe To Edit?** ✅ **Yes**.
- **Risks:** Low risk. Ensure sorting logic maps back to fee properties correctly.

#### `MapPage.tsx`
- **Purpose:** MapLibre cluster map markers overlay.
- **Dependencies:** `react-map-gl`, `colleges.ts`.
- **Used By:** `App.tsx`
- **Safe To Edit?** ✅ **Yes**.
- **Risks:** Ensure coordinate values match longitude/latitude coordinates.
