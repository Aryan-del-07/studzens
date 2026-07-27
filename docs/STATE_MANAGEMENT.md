# State Management

The Studzens frontend utilizes a hybrid state management approach, avoiding bloated libraries like Redux in favor of native React Context and localized component state.

## State Management Architecture

```mermaid
graph TD
    subgraph Global State [Global State - React Context]
        Auth[AuthContext]
        Profile[StudentProfileContext]
    end

    subgraph Browser Storage [Persistence]
        LS[(LocalStorage)]
    end

    subgraph Local State [Component State]
        DashState[Dashboard: Selected Category]
        ExamState[ExamHub: Calendar Month]
        SearchState[SearchPage: Filter Query]
    end
    
    Auth <--> LS
    Profile <--> LS
    
    Auth --> App[Application Components]
    Profile --> App
    
    App --> Local State
```

## 1. Global State (React Context)

We use React Context for data that needs to be accessed by components at vastly different levels of the tree without prop-drilling.

### `AuthContext`
- **Purpose:** Manages the user's authentication status (`isAuthenticated`, `user` object).
- **Persistence:** Syncs with `localStorage` (key: `sz_auth`). If a user refreshes the page, the Context initializes with the data from `localStorage` to prevent logging them out.
- **Usage:** Checked by `ProtectedRoute` to deny access to `/dashboard` if unauthenticated. Used by `PageShell` to display the user's name.

### `StudentProfileContext`
- **Purpose:** Stores the user's non-auth preferences and tracked data (e.g., `bookmarkedColleges`, `trackedExams`, `targetStream`).
- **Persistence:** Syncs with `localStorage` (key: `sz_profile`).
- **Usage:** 
  - `ExamHubPage` reads `trackedExams` to populate the calendar.
  - `DashboardPage` reads `targetStream` to filter college recommendations.

## 2. Local State (`useState`, `useReducer`)

Data that is only relevant to a specific view is kept localized to that view's top-level component.

- **Form Inputs:** The search query in `SearchPage` is managed via a simple `useState`.
- **UI Toggles:** The active tab in `DashboardPage` (Reach vs. Safe) is managed locally. It does not need to be in Global Context because if the user navigates away and returns, defaulting back to the first tab is acceptable behavior.

## 3. Server State (Future API Integration)
Currently, data like the list of colleges is imported statically from `src/api/mocks/`. As the application migrates to the Express backend, this data will be considered **Server State**.
- **Strategy:** We plan to implement `TanStack Query` (React Query) to handle data fetching, caching, synchronization, and invalidation of server state.
