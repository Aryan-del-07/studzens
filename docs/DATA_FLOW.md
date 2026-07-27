# Data Flow Diagrams

This document illustrates how data moves through the Studzens application during key operations.

## 1. Exam Tracking Flow

When a user clicks "Pin Exam" in the Exam Hub.

```mermaid
sequenceDiagram
    participant User
    participant Component as ExamCard Component
    participant Context as StudentProfileContext
    participant LocalStorage
    participant API as Backend API (Future)
    participant DB as Database

    User->>Component: Clicks "Pin Exam"
    Component->>Context: dispatch({ type: 'TRACK_EXAM', payload: examId })
    Context->>Context: Update local state (add examId)
    Context->>LocalStorage: Save updated profile to browser storage
    
    %% Future API flow
    Context--)API: Async PUT /users/me/trackedExams
    API--)DB: Update UserExamTrack table
    DB--)API: Success response
    API--)Context: Sync confirmation
    
    Context-->>Component: State updated (pinned = true)
    Component-->>User: UI updates to show pinned state
```

## 2. Dashboard Data Loading Flow

When a user navigates to `/dashboard`.

```mermaid
sequenceDiagram
    participant Route as React Router (/dashboard)
    participant Component as DashboardPage
    participant Auth as AuthContext
    participant APIClient as API Utils
    participant API as Backend

    Route->>Auth: Check if authenticated?
    Auth-->>Route: Yes (User exists)
    Route->>Component: Render Dashboard
    
    Component->>Component: useEffect (mount)
    
    par Fetch Data
        Component->>APIClient: fetchColleges()
        Component->>APIClient: fetchExams()
    end
    
    APIClient->>API: GET /colleges
    APIClient->>API: GET /exams
    
    API-->>APIClient: Return College Data
    API-->>APIClient: Return Exam Data
    
    APIClient-->>Component: Resolve Promises
    
    Component->>Component: Apply Business Logic (categorize colleges into Best, Reliable, Safe)
    Component->>Component: Update React State (setColleges, setExams, setLoading(false))
    
    Component-->>User: Render Dashboard UI
```

## 3. Form Validation & Submission Flow (Login)

```mermaid
flowchart TD
    Start[User submits Login Form] --> Validate[Client-Side Validation]
    
    Validate -- Invalid --> ShowErrors[Update UI with Error Messages]
    Validate -- Valid --> Fetch[API POST /auth/login]
    
    Fetch --> ServerValidate[Server-Side Validation]
    ServerValidate -- Invalid --> Return400[Return 400 Bad Request]
    Return400 --> ShowErrors
    
    ServerValidate -- Valid --> CheckCreds[Check Password Hash]
    CheckCreds -- Incorrect --> Return401[Return 401 Unauthorized]
    Return401 --> ShowErrors
    
    CheckCreds -- Correct --> GenerateJWT[Generate JWT Token]
    GenerateJWT --> Return200[Return 200 OK + Token]
    
    Return200 --> UpdateAuth[Update AuthContext]
    UpdateAuth --> Redirect[Redirect to /dashboard]
```
