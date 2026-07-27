# Project Structure Guide

Welcome to the newly reorganized frontend architecture! This document serves as a guide for understanding where files live and how to maintain a clean, scalable, and modular codebase.

Our architecture is inspired by Feature-Sliced Design and Domain-Driven Design principles, keeping related files close to each other while providing shared directories for global logic.

## Directory Overview

```text
src/
├── api/             # API services and mock data
├── app/             # Application initialization and routing
├── assets/          # Static files (images, icons, fonts)
├── components/      # Shared components across the whole application
│   ├── common/      # Highly reusable, generic components (e.g., ErrorBoundary)
│   └── layout/      # App-wide layout wrappers (e.g., PageShell, Header, Footer)
├── config/          # Environment variables and global configuration
├── contexts/        # Global React Context providers (Auth, Theme, Notifications)
├── features/        # Business domains/modules (the core of the app)
│   └── authentication/ 
│       └── components/ # e.g. ProtectedRoute
├── hooks/           # Shared, global custom React hooks
├── pages/           # Route-level Page components
├── styles/          # Global CSS/SCSS and Tailwind configurations
├── types/           # Global TypeScript interfaces and type definitions
└── utils/           # Global helper functions (date formatting, math, geo)
```

## Detailed Breakdown

### `src/api/`
- **Why it exists**: To abstract all data-fetching logic away from UI components.
- **What belongs here**: Axios/Fetch instances, API route definitions, and mock data (`/mocks`). 
- **Best Practice**: Never make direct `fetch()` calls inside a component. Create a service function here and import it.

### `src/app/`
- **Why it exists**: To separate the app's structural wiring from the raw `main.tsx` entry point.
- **What belongs here**: `App.tsx`, the main React Router definition, and global provider wrappers.

### `src/assets/`
- **Why it exists**: To store static assets that need to be processed by Vite/Webpack.
- **What belongs here**: `images/`, `icons/`, `fonts/`, and static SVGs.

### `src/components/`
- **Why it exists**: To house UI elements that are reused across *multiple* different features or pages.
- **What belongs here**: 
  - `common/`: Buttons, Inputs, Cards, Modals, ErrorBoundaries.
  - `layout/`: Navbars, Sidebars, Footers.
- **Best Practice**: Components here should be "dumb" (purely presentational). They should not fetch their own data or depend on specific business logic.

### `src/features/`
- **Why it exists**: To colocate business logic, keeping the codebase scalable as it grows.
- **What belongs here**: Domain-specific code. Each feature (like `authentication`, `dashboard`, `exams`) should have its own self-contained folder structure (e.g., `features/exams/components`, `features/exams/hooks`, `features/exams/utils`).
- **Best Practice**: If a component is ONLY used by the authentication flow, put it in `features/authentication/components/`, NOT in the global `src/components/` folder.

### `src/hooks/`
- **Why it exists**: For reusable React logic.
- **What belongs here**: `useLocalStorage`, `useDebounce`, `useSearch`.
- **Best Practice**: Only put hooks here if they are generic and used across multiple features.

### `src/pages/`
- **Why it exists**: To define the actual screens that users navigate to.
- **What belongs here**: High-level page components (e.g., `LoginPage.tsx`, `DashboardPage.tsx`).
- **Best Practice**: A Page component should act as an orchestrator. It should contain very little UI markup itself. Instead, it should import components from `src/features/` and `src/components/` and pass data to them.

### `src/styles/`
- **Why it exists**: To manage global stylesheets.
- **What belongs here**: `index.css`, Tailwind custom classes, global resets.

### `src/types/`
- **Why it exists**: To ensure type safety across the app.
- **What belongs here**: Global TypeScript interfaces (e.g., `User`, `College`, `Exam`).

### `src/utils/`
- **Why it exists**: For pure JavaScript/TypeScript helper functions.
- **What belongs here**: String formatters, date parsers, geolocation math (`geo.ts`).
- **Best Practice**: Functions here should be pure (given the same input, they always return the same output) and contain no React code.

---

## Guide for Future Developers

**Where do I put a new...?**

1. **New Button Design**: `src/components/common/Button.tsx`
2. **New Page (e.g. Settings)**: `src/pages/SettingsPage.tsx`
3. **Component only used on Settings Page**: `src/features/settings/components/ProfileForm.tsx`
4. **Logic to format dates**: `src/utils/dateFormatter.ts`
5. **Logic to fetch user profile**: `src/features/settings/api/fetchProfile.ts`
6. **New Global State (e.g. Dark Mode)**: `src/contexts/ThemeContext.tsx`
7. **Types for the College object**: `src/types/college.ts`

By following this structure, our app will remain intuitive and easy to navigate even as we scale to hundreds of components!
