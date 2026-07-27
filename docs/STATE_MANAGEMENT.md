# Studzens — State Management

## Philosophy

Studzens avoids external state management libraries (Redux, Zustand, Jotai). Instead it uses **React's built-in primitives** — Context + useState + useReducer + useMemo — with localStorage for persistence.

---

## Global State (React Contexts)

Four context providers are mounted at the root in `main.tsx`, wrapping the entire app:

```
<AuthProvider>
  <BookmarkProvider>
    <NotificationProvider>
      <StudentProfileProvider>
        <App />
```

### 1. `AuthContext` — `contexts/AuthContext.tsx`

Manages authentication state.

| Export | Type | Description |
|---|---|---|
| `isAuthenticated` | `boolean` | True if a user session exists |
| `user` | `User \| null` | Currently logged-in user object |
| `login(email, password)` | `Promise<void>` | Authenticates and stores session |
| `logout()` | `void` | Clears session |

**Persistence:** Session is stored in `localStorage` so users remain logged in across refreshes.

---

### 2. `BookmarkContext` — `contexts/BookmarkContext.tsx`

Manages the list of saved (bookmarked) colleges.

| Export | Type | Description |
|---|---|---|
| `bookmarks` | `Bookmark[]` | Array of saved college bookmarks |
| `addBookmark(collegeId, category)` | `void` | Adds a college to saved list |
| `removeBookmark(collegeId)` | `void` | Removes a saved college |
| `isBookmarked(collegeId)` | `boolean` | Check if a college is saved |

**Persistence:** Uses the `useLocalStorage` hook — bookmarks survive page refresh.

---

### 3. `NotificationContext` — `contexts/NotificationContext.tsx`

In-app toast notification queue.

| Export | Type | Description |
|---|---|---|
| `notifications` | `Notification[]` | Current notification queue |
| `notify(message, type)` | `void` | Push a new notification (success/error/info) |
| `dismiss(id)` | `void` | Remove a notification by ID |

**Persistence:** In-memory only (notifications disappear on refresh by design).

---

### 4. `StudentProfileContext` — `contexts/StudentProfileContext.tsx`

Holds the student's onboarding profile data, which drives all personalised recommendations.

| Export | Type | Description |
|---|---|---|
| `profile` | `StudentProfile \| null` | Full onboarding profile |
| `setProfile(data)` | `void` | Save or update the profile |
| `hasProfile` | `boolean` | True if onboarding is complete |

**Persistence:** Uses `useLocalStorage` — profile survives refresh, no re-onboarding needed.

`StudentProfile` shape:
```typescript
interface StudentProfile {
  name: string;
  stream: string;           // "Engineering" | "Medical" | "Commerce" | "Arts"
  class: "11" | "12" | "Appeared" | "Passed";
  twelfthMarks?: number;    // percentage
  examScores: Record<string, number>; // { "JEE Mains": 95, "NEET": 620, ... }
  budget: number;           // max annual fee in INR
  preferredStates: string[]; // e.g. ["Maharashtra", "Delhi"]
}
```

---

## Local / Page-Level State

Pages and components manage their own ephemeral state with standard React hooks:

| Pattern | Usage |
|---|---|
| `useState` | Filter selections, form fields, toggle states, modal open/close |
| `useReducer` | Complex multi-step forms (e.g. OnboardingPage step machine) |
| `useMemo` | Derived filtered/sorted college lists (avoids recomputing on every render) |
| `useEffect` | Side effects: scroll restoration, document title updates |

---

## Custom Hooks

### `useLocalStorage<T>(key, initialValue)` — `hooks/useLocalStorage.ts`

Type-safe wrapper around `localStorage` that behaves like `useState`:
```typescript
const [value, setValue] = useLocalStorage<College[]>('bookmarks', []);
```

### `useSearch(items, fields, query)` — `hooks/useSearch.ts`

Debounced multi-field search/filter hook used on SearchPage and ExamHubPage:
```typescript
const results = useSearch(colleges, ['name', 'city', 'state'], searchQuery);
```

---

## Data Flow Summary

```
User fills in OnboardingPage
    ↓
StudentProfileContext.setProfile(data) → persisted to localStorage
    ↓
DashboardPage reads profile → computes match scores with useMemo
    ↓
Renders ranked college cards (Safe Reach / Safe / Safe Backup)
    ↓
User clicks bookmark → BookmarkContext.addBookmark() → persisted to localStorage
    ↓
NotificationContext.notify("College saved!") → toast appears
```
