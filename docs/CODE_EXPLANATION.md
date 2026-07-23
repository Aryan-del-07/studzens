# CODE_EXPLANATION.md

## How Key Code Sections Work

This document explains the most important and complex code in the app. It's written for beginner developers who want to understand how things work under the hood.

---

## 1. Authentication System (AuthContext.tsx)

### How Login Works

```typescript
const login = (userData) => {
  setUser({
    ...userData,
    id: Math.random().toString(36).substring(2, 9),
  });
};
```

**What happens:**
1. The user enters their email and password on the LoginPage
2. The `handleSubmit` function calls `login()` with the user's name and email
3. A random ID is generated (in a real app, this would come from a backend API)
4. The user object is stored in React state AND in localStorage via `useLocalStorage`
5. The `isAuthenticated` flag becomes `true`

### Why Per-User Onboarding?

```typescript
const [onboardingMap, setOnboardingMap] = useLocalStorage<Record<string, boolean>>(
  'stuzen_onboarding_v2',
  {}
);
```

**The problem:** Old code used a single boolean `stuzen_onboarding_done`. If User A completed onboarding, User B on the same browser would skip it.

**The solution:** We now store a map where each email is a key:
```typescript
{ "alice@gmail.com": true, "bob@gmail.com": false }
```

This way, each user gets their own onboarding flag.

---

## 2. College Recommendation Engine (collegeIntelligence.ts)

### How Colleges Are Ranked for the Dashboard

```typescript
export function getDashboardColleges(profile: StudentProfile) {
  const all = colleges;
  const stream = profile.academicProfile?.stream;
  const budget = profile.preferences?.budgetLimitLpa;
  const marks = profile.academicProfile?.marks12;

  // Score each college 0-100 based on how well it matches the student
  const scored = all.map(college => ({
    ...college,
    matchScore: getMatchScore(college, profile)
  }));

  // Sort by score (highest first), then by ranking
  return scored.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return a.ranking - b.ranking;
  });
}
```

**The scoring algorithm:**
1. **Eligibility (0-40 points):** Does the student meet the cutoff? If marks >= cutoff, full points. Otherwise, proportional points.
2. **Stream Match (0-25 points):** Does the college offer the student's stream? Full points if yes, partial if related.
3. **Budget Fit (0-20 points):** Is the college within budget? Full points if yes. Penalty if over budget.
4. **Preference Match (0-15 points):** Does the college match preferred states and ownership types?

**Total: 0-100 points.** Colleges above 70 are "excellent matches", 50-70 are "good matches", below 50 are "reaches".

---

## 3. Exam Readiness Scoring (examCommandCenter.ts)

### How the Readiness Score Is Calculated

```typescript
export function calculateReadinessScore(profile: StudentProfile) {
  const marks = profile.academicProfile?.marks12 || 0;
  const attempts = Object.keys(profile.examScores || {}).length;
  const preferences = profile.preferences;

  let score = 0;

  // Academic performance (0-40): Higher marks = higher score
  score += Math.min((marks / 100) * 40, 40);

  // Exam exposure (0-30): More attempted exams = higher score
  score += Math.min(attempts * 10, 30);

  // Preference completion (0-30): Filling preferences = higher score
  if (preferences?.preferredStates?.length) score += 10;
  if (preferences?.careerInterests?.length) score += 10;
  if (profile.academicProfile?.category) score += 10;

  return Math.min(Math.round(score), 100);
}
```

**What it measures:** How prepared the student is for college admissions. A score of 80+ means "well prepared", 50-79 means "getting there", below 50 means "needs more preparation".

---

## 4. Dashboard Page (DashboardPage.tsx)

### Performance Optimizations

The DashboardPage is the most complex page. It uses `useMemo` to prevent expensive computations on every render:

```typescript
// Before: Called on EVERY render (slow)
const recommendedColleges = getDashboardColleges(profile);

// After: Only recomputes when profile changes (fast)
const recommendedColleges = useMemo(
  () => getDashboardColleges(profile),
  [profile]
);
```

**What is memoized:**
- `recommendedColleges` — College scoring engine (expensive)
- `todayMockExams` — Exam filtering and sorting
- `priorities` — Daily todo list generation
- `readiness` — Readiness score calculation
- `calendarEvents` — Calendar event mapping
- `suggestedExams` — Exam recommendation engine

**What is memoized with useCallback:**
- `handleTogglePriority` — Priority checkbox toggle
- `calculateDays` — Date difference helper
- `handlePrevMonth` / `handleNextMonth` — Calendar navigation
- `getEventsForDate` — Event filtering by date

### Why This Matters

Without these optimizations, every keystroke, hover, or state update in the Dashboard would re-run:
- Scoring 50+ colleges
- Filtering 15+ exams
- Generating a calendar grid
- Recalculating readiness

That's **hundreds of operations per render**. With `useMemo`, these only run when the underlying data changes.

---

## 5. Theme System (index.css)

### CSS Custom Properties vs. Override Rules

**Old approach (300+ lines):**
```css
.dark .bg-white { background-color: #1E293B; }
.dark .text-[#0A2540] { color: #F1F5F9; }
/* 300 more lines... */
```

**New approach (cleaner):**
```css
:root {
  --bg-surface: #ffffff;
  --text-primary: #0A2540;
}

.dark {
  --bg-surface: #1E293B;
  --text-primary: #F1F5F9;
}

.sz-card {
  background-color: var(--bg-surface);
  color: var(--text-primary);
}
```

**Why this is better:**
- **Maintainable:** Change one variable, update the whole app
- **Performant:** Browser processes fewer CSS rules
- **Semantic:** `--text-primary` means something, `#0A2540` is just a color
- **Extensible:** Easy to add new themes (e.g., high-contrast mode)

### The Compatibility Layer

Old code still uses hardcoded Tailwind classes like `text-[#0A2540]`. We added a compatibility layer of `.dark` override rules so existing code still works while new code uses variables.

---

## 6. Error Boundary (ErrorBoundary.tsx)

### How It Catches Errors

```typescript
class ErrorBoundary extends Component<Props, State> {
  // Called when a child component throws an error
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Called AFTER the error is caught
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught an error:', error, errorInfo);
  }
}
```

**The lifecycle:**
1. A child component throws an error (e.g., a map fails to load)
2. React calls `getDerivedStateFromError` → state updates to `hasError: true`
3. React re-renders the boundary with the new state
4. The boundary renders the fallback UI instead of the broken children
5. `componentDidCatch` is called → we can log to an error tracking service

**Why class component?** Error boundaries must be class components in React. Hooks can't catch errors from children.

---

## 7. Map Integration (MapPage.tsx)

### How Colleges Are Displayed on the Map

```typescript
// 1. Convert college data to GeoJSON format (required by MapLibre)
const geojson = getGeoJSONFromColleges(colleges);

// 2. Add a layer for college markers
map.addLayer({
  id: 'colleges',
  type: 'circle',
  source: { type: 'geojson', data: geojson },
  paint: {
    'circle-radius': 8,
    'circle-color': '#635BFF',
  }
});

// 3. Show a popup when a marker is clicked
map.on('click', 'colleges', (e) => {
  const college = e.features[0].properties;
  new maplibregl.Popup()
    .setHTML(`<h3>${college.name}</h3>`)
    .addTo(map);
});
```

**GeoJSON format:** A standard way to represent geographic data. Each college becomes a "Feature" with coordinates and properties.

---

## 8. AI Counselor (AICounselorPage.tsx)

### How "AI" Responses Work (No Real AI Backend)

```typescript
function generateResponse(userMessage: string, profile: StudentProfile): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('college') || lower.includes('recommend')) {
    const stream = profile.academicProfile?.stream;
    const colleges = getDashboardColleges(profile).slice(0, 3);
    return `Based on your ${stream} stream, I recommend: ${colleges.map(c => c.name).join(', ')}.`;
  }

  if (lower.includes('exam') || lower.includes('test')) {
    const tracked = profile.trackedExams || [];
    return `You are tracking ${tracked.length} exams. Would you like to see preparation tips?`;
  }

  return "I'm here to help! What would you like to know about colleges, exams, or careers?";
}
```

**How it works:**
1. User sends a message
2. The app checks for keywords ("college", "exam", "career", "fee", etc.)
3. It picks a response template based on the keyword
4. It fills in the template with data from the student's profile
5. It displays the response with a simulated "typing" delay

**To add a real AI backend:** Replace the keyword matching with an API call to OpenAI, Claude, or a custom model. Pass the student's profile as context.

---

## 9. Onboarding Flow (OnboardingPage.tsx)

### How the 4-Step Wizard Works

```typescript
const [step, setStep] = useState(0);  // Current step: 0-3
const [data, setData] = useState({
  currentClass: '',
  board: '',
  stream: '',
  // ... more fields
});
```

**Step 0: Academic Background**
- Required: Current class and board
- Optional: Marks for 10th, 11th, 12th

**Step 1: Entrance Exams**
- Select exams the student is preparing for
- Add scores for each exam

**Step 2: Interests**
- Favorite subjects
- Career goals

**Step 3: Location & Budget**
- Preferred states
- Annual fee budget (slider)

**Validation:**
```typescript
const canProceed = () => {
  if (step === 0) {
    if (!data.currentClass || !data.board) return false;
    return true;
  }
  // ... validation for other steps
  return true;
};
```

The "Continue" button is disabled if `canProceed()` returns false.

---

## 10. Protected Routes (ProtectedRoute.tsx)

### How Route Guards Work

```typescript
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save where they were trying to go
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // They're logged in — render the page
  return <Outlet />;
}
```

**What happens:**
1. User tries to visit `/dashboard` (protected)
2. ProtectedRoute checks `isAuthenticated`
3. If NOT logged in → redirect to `/login` with `from` state
4. After login, if `from` exists → redirect back to original page
5. If logged in → render the DashboardPage

---

*Last updated: June 2026*
