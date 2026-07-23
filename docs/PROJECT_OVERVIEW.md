# PROJECT_OVERVIEW.md

## What is Stuzen?

Stuzen is a **student college finder and career planning platform** designed for Indian students preparing for higher education. It combines college search, exam tracking, career exploration, and AI-powered guidance into a single, premium web application.

---

## Target Users

| User | Goal | How Stuzen Helps |
|------|------|------------------|
| **High School Students (Class 10-12)** | Find colleges that match their academic profile | Personalized recommendations based on marks, board, and stream |
| **Dropout / Repeater Students** | Get a second chance at college admissions | Alternative exam options and career paths |
| **Parents** | Research colleges for their children | Detailed comparison, fee breakdown, and placement data |
| **Career Counselors** | Guide students with data | AI counselor and structured career information |

---

## Core User Flows

### Flow 1: First-Time Student

```
Landing Page → Sign Up → Onboarding (4 steps) → Dashboard → Search Colleges → Compare → Bookmark
```

**Onboarding Steps:**
1. **Academic Background** — Current class, board, stream, marks, category
2. **Entrance Exams** — Exams taken or planned, scores
3. **Interests** — Favorite subjects, career goals
4. **Location & Budget** — Preferred states, annual fee budget

### Flow 2: Returning Student

```
Login → Dashboard → View Recommendations → Check Exam Countdown → AI Counselor → Update Profile
```

### Flow 3: College Research

```
Search Page → Apply Filters → View College Profile → See Courses & Fees → Compare with Others → Bookmark
```

### Flow 4: Exam Preparation

```
Exam Hub → Browse Exams → Track Relevant Exams → View Countdown → Check Syllabus → AI Counselor for Tips
```

---

## Key Features by Page

| Page | Primary Purpose | Key Interactions |
|------|-----------------|------------------|
| **Landing** | Convert visitors to users | Hero CTA, feature showcase, stats, testimonials |
| **Login** | Authenticate users | Email/password, Google sign-in, sign up toggle |
| **Onboarding** | Collect student profile | Multi-step form with validation, skip option |
| **Dashboard** | Daily hub and recommendations | Exam countdown, college recommendations, calendar, AI insights |
| **Search** | Find colleges | Search bar, filters, bookmark toggle, compare checkbox |
| **College Profile** | Deep dive into one college | Tabs, courses, fees, placements, facilities, gallery, map |
| **Compare** | Side-by-side comparison | Dropdown selectors, comparison table, winner highlights |
| **Map** | Geographic exploration | Interactive map, markers, popups, zoom/pan |
| **Exam Hub** | Browse and track exams | Countdown timers, track toggle, category filter |
| **Exam Details** | Deep dive into one exam | Syllabus, pattern, dates, tips, related colleges |
| **Career Explorer** | Discover career paths | Cards, salary info, growth rate, related courses |
| **AI Counselor** | Get instant guidance | Chat interface, suggested prompts, profile-aware responses |
| **Profile** | Manage personal data | Edit form, strength indicator, bookmarks, tracked exams |

---

## Data Model (Simplified)

```
User (AuthContext)
  └── id, name, email, role, onboardingCompleted

StudentProfile (StudentProfileContext)
  ├── academicProfile
  │     ├── currentClass, board, stream, marks10/11/12, category, homeState
  ├── preferences
  │     ├── budgetLimitLpa, preferredStates, careerInterests, preferredOwnership
  ├── examScores
  │     ├── { examId: { score, date } }
  ├── trackedExams
  │     ├── [examId1, examId2, ...]
  └── targetCareers
        ├── [careerId1, careerId2, ...]

Bookmarks (BookmarkContext)
  └── [collegeId1, collegeId2, ...]

Notifications (NotificationContext)
  └── [{ id, message, type, timestamp }]
```

---

## Personalization Engine

The app personalizes content using:

1. **College Scoring** (`utils/collegeIntelligence.ts`)
   - Matches colleges to the student's stream, marks, and budget
   - Returns a 0-100 match score for each college

2. **Exam Readiness** (`utils/examCommandCenter.ts`)
   - Calculates readiness based on marks, exam attempts, and preferences
   - Generates a daily priority list

3. **AI Counselor** (`pages/AICounselorPage.tsx`)
   - Uses template-based responses personalized with profile data
   - No real AI backend (simulated for demonstration)

---

## Design Philosophy

The app is designed to feel:

- **Fast** — Optimized rendering, cached computations, smooth transitions
- **Calm** — Clean layouts, generous whitespace, muted colors
- **Premium** — Modern card styles, subtle shadows, polished interactions
- **Trustworthy** — Clear data, consistent UI, helpful empty states
- **Student-Friendly** — Simple language, no jargon, guided flows

Every screen answers: **"What should the student do next?"**

---

## Offline & Persistence

All user data is stored in **browser localStorage**:

| Data | Storage Key | Persistence |
|------|-------------|-------------|
| Auth User | `stuzen_auth_user` | Survives browser restart |
| Onboarding | `stuzen_onboarding_v2` | Per-user map |
| Profile | `stuzen_profile` | Survives browser restart |
| Bookmarks | `stuzen_bookmarks` | Survives browser restart |
| Theme | `stuzen-theme` | Survives browser restart |

**Note:** This is a demo architecture. A production app would use a real database with user accounts, server-side storage, and API authentication.

---

## Future Roadmap

### Short Term (Next 2 Weeks)
- [ ] Replace static data with API integration
- [ ] Add real Google OAuth login
- [ ] Implement PWA (offline support, installable app)
- [ ] Add push notifications for exam deadlines

### Medium Term (Next 2 Months)
- [ ] Add college reviews and ratings from students
- [ ] Implement real AI chat backend (OpenAI/Claude API)
- [ ] Add scholarship finder and application tracker
- [ ] Integrate with university admission portals

### Long Term (Next 6 Months)
- [ ] Native mobile apps (React Native / Flutter)
- [ ] Study material marketplace
- [ ] Peer mentoring and community features
- [ ] Analytics dashboard for schools and counselors

---

## Contact & Support

For questions, bug reports, or feature requests, please refer to the project documentation or contact the development team.

---

*Last updated: June 2026*
