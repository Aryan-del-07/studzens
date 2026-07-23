# DEVELOPER_GUIDE.md

## For Beginner Developers

This guide explains how to develop, extend, and deploy the Stuzen app. It's written in simple language for developers who are new to React or TypeScript.

---

## Prerequisites

Before you start, you need these tools installed on your computer:

| Tool | Version | Why We Need It | Download |
|------|---------|----------------|----------|
| **Node.js** | 18+ or 20+ | Runs JavaScript outside the browser | [nodejs.org](https://nodejs.org) |
| **npm** | Comes with Node.js | Installs and manages project dependencies | Included with Node.js |
| **Git** | Any version | Downloads and saves code changes | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | Code editor with helpful features | [code.visualstudio.com](https://code.visualstudio.com) |

**Check if they're installed:**
```bash
node --version    # Should print v18.x.x or higher
npm --version     # Should print 9.x.x or higher
git --version     # Should print a version number
```

---

## Quick Start (5 Minutes)

### Step 1: Clone the Project

```bash
# Open a terminal (Terminal on Mac, Command Prompt on Windows)
# Navigate to where you want the project folder
cd Documents

# Clone the repository
git clone <repo-url>

# Enter the project folder
cd stuzen
```

### Step 2: Install Dependencies

```bash
npm install
```

This downloads all the libraries the app needs (React, Tailwind, etc.). It may take 1-2 minutes. You'll see a `node_modules` folder appear — this is where all the code lives.

### Step 3: Start the Development Server

```bash
npm run dev
```

You'll see output like:
```
VITE v8.0.16  ready in 430 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The app will automatically reload when you save code changes.

### Step 4: Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

```bash
npm run preview
```

This previews the production build locally before you deploy it.

---

## Project Structure for Beginners

```
stuzen/
├── src/                    ← All the code you write goes here
│   ├── pages/              ← One file per screen (e.g., Dashboard, Login)
│   ├── components/         ← Reusable pieces (e.g., Header, Card)
│   ├── contexts/           ← Global data that any component can access
│   ├── hooks/              ← Reusable logic (e.g., saving to localStorage)
│   ├── utils/              ← Helper functions (e.g., scoring colleges)
│   ├── data/               ← Static information (colleges, exams, careers)
│   ├── types/              ← TypeScript definitions (what data looks like)
│   ├── App.tsx             ← Main app component (routes go here)
│   ├── main.tsx            ← Entry point (first file that runs)
│   └── index.css           ← All colors, fonts, and animations
├── public/                 ← Images and files that don't need processing
├── index.html              ← The HTML page that loads the app
├── vite.config.ts          ← Build tool settings
├── tsconfig.json           ← TypeScript settings
├── package.json            ← List of dependencies and scripts
└── README.md               ← Project overview
```

### Key Concepts

- **Pages** = Full screens (like `/dashboard`, `/login`)
- **Components** = Reusable building blocks (like a Button, Card, or Header)
- **Contexts** = Share data between components without passing props through every level
- **Hooks** = Reusable logic that multiple components can use
- **Types** = Describe what data looks like (helps catch bugs before you run the app)

---

## Common Development Tasks

### How to Add a New Page

**Step 1: Create the page file**

Create `src/pages/YourPage.tsx`:

```tsx
/**
 * YourPage.tsx
 *
 * WHAT THIS FILE DOES:
 *   [Describe what this page shows or does]
 */

export default function YourPage() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] dark:bg-slate-950">
      <h1 className="text-3xl font-bold text-[#0A2540] dark:text-slate-100">
        Your Page Title
      </h1>
      <p className="text-[#697386] dark:text-slate-400">
        Your page content goes here.
      </p>
    </div>
  );
}
```

**Step 2: Add the route**

Open `src/App.tsx` and add a new route:

```tsx
import YourPage from './pages/YourPage';

// Inside the Routes component, add:
<Route path="/your-page" element={<YourPage />} />
```

**Step 3: Add a navigation link (optional)**

Open `src/components/layout/PageShell.tsx` and add a link to the desktop and mobile navs.

---

### How to Add a New Component

**Step 1: Create the component file**

Create `src/components/YourComponent.tsx`:

```tsx
/**
 * YourComponent.tsx
 *
 * WHAT THIS FILE DOES:
 *   [Describe what this component does]
 *
 * PROPS:
 *   - title: string — The title to display
 *   - onClick: () => void — Called when the user clicks the button
 */

interface Props {
  title: string;
  onClick: () => void;
}

export default function YourComponent({ title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="btn-primary"
    >
      {title}
    </button>
  );
}
```

**Step 2: Use it in a page**

```tsx
import YourComponent from '../components/YourComponent';

function SomePage() {
  const handleClick = () => {
    alert('Clicked!');
  };

  return (
    <YourComponent title="Click Me" onClick={handleClick} />
  );
}
```

---

### How to Change the Theme Colors

Open `src/index.css` and find the `:root` section:

```css
:root {
  --accent-primary: #635BFF;     /* Change this to your brand color */
  --bg-page: #F6F7FB;             /* Change this to your page background */
  --text-primary: #0A2540;       /* Change this to your text color */
}
```

For dark mode, change the `.dark` section:

```css
.dark {
  --accent-primary: #818CF8;     /* Dark mode brand color */
  --bg-page: #0B1120;             /* Dark mode page background */
  --text-primary: #F1F5F9;       /* Dark mode text color */
}
```

**Tip:** Use a tool like [coolors.co](https://coolors.co) to generate color palettes.

---

### How to Add a New College

Open `src/data/colleges.ts` and add a new object to the `colleges` array:

```typescript
{
  id: 51,  // Must be unique
  name: 'Your College Name',
  location: 'City, State',
  type: 'private',  // or 'government', 'deemed', 'autonomous'
  ranking: 25,
  fees: { min: 2, max: 6 },  // in lakhs per year
  courses: [
    { name: 'Computer Science', stream: 'engineering', duration: '4 Years', fees: 5 },
  ],
  placement: {
    highestPackage: 20,  // in LPA
    averagePackage: 8,
    topRecruiters: ['Google', 'Microsoft'],
  },
  facilities: [
    { name: 'Library', rating: 4.5 },
  ],
  hostel: { available: true, fees: 1.2 },
  website: 'https://college.edu',
  coordinates: [77.0, 28.0],  // [longitude, latitude]
  contact: {
    phone: '+91-1234567890',
    email: 'info@college.edu',
  },
}
```

**Important:** Make sure the `id` is unique and doesn't conflict with existing colleges.

---

### How to Add a New Exam

Open `src/data/exams.ts` and add a new object to the `exams` array:

```typescript
{
  id: 'your-exam',
  name: 'Your Exam Name',
  fullName: 'Full Official Name of the Exam',
  category: 'engineering',  // or 'medical', 'law', 'design', etc.
  eligibility: 'Eligibility criteria',
  pattern: {
    sections: ['Physics', 'Chemistry', 'Math'],
    totalMarks: 300,
    duration: 180,  // in minutes
    negativeMarking: true,
  },
  importantDates: [
    { event: 'Registration Start', date: '2025-01-15' },
    { event: 'Exam Date', date: '2025-04-10' },
  ],
  syllabus: 'Syllabus description...',
  preparationTips: [
    'Tip 1',
    'Tip 2',
  ],
  relatedColleges: [1, 2, 3],  // IDs of colleges that accept this exam
  mockExamDates: [
    { date: '2025-03-15', name: 'Mock Test 1' },
  ],
}
```

---

### How to Add a New Career

Open `src/data/careers.ts` and add a new object to the `careers` array:

```typescript
{
  id: 'your-career',
  title: 'Career Title',
  description: 'What this career involves...',
  icon: 'briefcase',  // Lucide icon name
  salary: { min: 5, max: 20, currency: 'LPA' },
  growthRate: 15,  // percentage
  category: 'engineering',
  relatedCourses: ['B.Tech', 'M.Tech'],
  skills: ['Skill 1', 'Skill 2'],
  responsibilities: ['Responsibility 1', 'Responsibility 2'],
  topColleges: [1, 2, 3],
  futureScope: 'Description of future opportunities...',
}
```

---

## Understanding the Code

### What is a "Hook"?

A hook is a special function that lets you use React features (like state) in a function component.

**Common hooks:**

```tsx
import { useState, useEffect, useMemo, useCallback } from 'react';

function Example() {
  // useState: Stores data that changes over time
  const [count, setCount] = useState(0);

  // useEffect: Runs code when something changes (like page load)
  useEffect(() => {
    console.log('Component loaded!');
  }, []);  // Empty array = run once on load

  // useMemo: Caches expensive calculations
  const expensiveValue = useMemo(() => {
    return count * 1000;
  }, [count]);  // Only recalculate when count changes

  // useCallback: Caches function definitions
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);  // Function never changes

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### What is "Context"?

Context is a way to share data between components without passing props through every level.

**Without Context (prop drilling):**
```tsx
<App>
  <Header user={user} />       {/* Pass user to Header */}
  <Sidebar user={user} />      {/* Pass user to Sidebar */}
  <Dashboard>
    <ProfileCard user={user} />  {/* Pass user to ProfileCard */}
  </Dashboard>
</App>
```

**With Context (cleaner):**
```tsx
// Any component can access user data:
const { user } = useAuth();
```

### What is "TypeScript"?

TypeScript adds "types" to JavaScript. It helps catch bugs before you run the code.

**Without TypeScript (JavaScript):**
```javascript
function greet(name) {
  return "Hello, " + name;
}

greet(123);  // No error! But outputs "Hello, 123"
```

**With TypeScript:**
```typescript
function greet(name: string) {
  return "Hello, " + name;
}

greet(123);  // ERROR: Argument of type 'number' is not assignable to parameter of type 'string'
```

---

## Common Errors and How to Fix Them

### Error: "Module not found"

**Cause:** You imported a file that doesn't exist or the path is wrong.

**Fix:** Check the import path. Make sure the file exists and the case matches exactly.

```tsx
// Wrong:
import YourPage from './pages/yourpage';  // File is YourPage.tsx

// Right:
import YourPage from './pages/YourPage';
```

### Error: "Cannot find name 'X'"

**Cause:** You're using a variable or function that hasn't been defined or imported.

**Fix:** Import the missing item or define the variable.

```tsx
// Wrong:
const result = calculateSomething();  // calculateSomething is not defined

// Right:
import { calculateSomething } from '../utils/helpers';
const result = calculateSomething();
```

### Error: "Property 'X' does not exist on type 'Y'"

**Cause:** TypeScript doesn't know about a property on an object.

**Fix:** Add the property to the type definition or use optional chaining.

```tsx
// Wrong:
const name = user.fullName;  // TypeScript says 'fullName' doesn't exist on 'AuthUser'

// Right:
const name = user.name;  // Use the correct property name
// OR:
const name = (user as any).fullName;  // Temporary workaround (not recommended)
```

### Error: "Too many re-renders"

**Cause:** A function that updates state is being called during render, causing an infinite loop.

**Fix:** Use `useEffect` for side effects, or wrap the function in an event handler.

```tsx
// Wrong:
function BadComponent() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // This runs during render, causing infinite loop!
  return <div>{count}</div>;
}

// Right:
function GoodComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCount(c => c + 1), 1000);
    return () => clearTimeout(timer);
  }, []);

  return <div>{count}</div>;
}
```

---

## Performance Tips

### 1. Use `useMemo` for Expensive Calculations

```tsx
// Bad: Calculates on every render
const filtered = items.filter(i => i.score > 50).sort((a, b) => b.score - a.score);

// Good: Only recalculates when items change
const filtered = useMemo(
  () => items.filter(i => i.score > 50).sort((a, b) => b.score - a.score),
  [items]
);
```

### 2. Use `useCallback` for Event Handlers

```tsx
// Bad: New function created on every render
const handleClick = () => setCount(c => c + 1);

// Good: Function is cached
const handleClick = useCallback(() => setCount(c => c + 1), []);
```

### 3. Don't Put Too Much in `useEffect`

```tsx
// Bad: Too many things in one effect
useEffect(() => {
  fetchData();
  calculateScores();
  updateUI();
  logAnalytics();
}, [dep1, dep2, dep3, dep4, dep5]);

// Good: Split into separate effects
useEffect(() => { fetchData(); }, [dep1]);
useEffect(() => { calculateScores(); }, [dep2]);
```

### 4. Use the CSS Custom Properties

Instead of hardcoded colors, use the theme variables:

```tsx
// Bad: Hardcoded colors that break in dark mode
<div className="bg-white text-[#0A2540]">

// Good: Uses CSS variables that adapt to theme
<div className="sz-card">
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repo
4. Vercel will auto-detect Vite and build settings
5. Click "Deploy" — your app will be live in minutes

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy site"

### Deploy to GitHub Pages

1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Set `base` in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
   });
   ```
4. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

---

## Useful Resources

| Topic | Resource |
|-------|----------|
| React | [react.dev](https://react.dev) |
| TypeScript | [typescriptlang.org](https://typescriptlang.org) |
| Tailwind CSS | [tailwindcss.com](https://tailwindcss.com) |
| React Router | [reactrouter.com](https://reactrouter.com) |
| Vite | [vitejs.dev](https://vitejs.dev) |
| Lucide Icons | [lucide.dev](https://lucide.dev) |
| MapLibre GL | [maplibre.org](https://maplibre.org) |

---

## Getting Help

If you're stuck:

1. **Read the error message carefully** — TypeScript errors usually tell you exactly what's wrong
2. **Check the console** — Open browser DevTools (F12) and look at the Console tab
3. **Use the search** — Search for the error message online (Stack Overflow, GitHub issues)
4. **Ask for help** — Describe what you were trying to do and what error you got

---

*Last updated: June 2026*
