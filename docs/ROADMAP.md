# Studzens — Roadmap

## Milestone 1 ✅ — Foundation (Complete)

- [x] React + Vite SPA with TypeScript
- [x] React Router v7 with protected routes
- [x] AuthContext (login / logout / session persistence)
- [x] Landing page with hero, features, stats, CTA
- [x] College search & filter page
- [x] College profile detail page
- [x] Exam Hub + Exam detail pages
- [x] Career Explorer page
- [x] Personalized Dashboard with match scoring
- [x] Multi-step Onboarding wizard
- [x] User Profile page
- [x] Side-by-side College Compare page
- [x] Interactive MapLibre GL map page
- [x] BookmarkContext with persistence
- [x] NotificationContext (in-app toasts)
- [x] StudentProfileContext
- [x] Mobile responsive layout + bottom tab bar

---

## Milestone 2 ✅ — Django 5 & REST Framework Backend (Complete)

- [x] Migrate backend architecture to Django 5.1 & DRF 3.15
- [x] 10 Django ORM models (`User`, `Profile`, `College`, `Program`, `Placement`, `Review`, `Exam`, `CollegeExam`, `Bookmark`, `Facility`)
- [x] Database migration & deployment to serverless Neon PostgreSQL
- [x] SimpleJWT authentication (Register, Login, Refresh, Me)
- [x] Real-time Django FilterBackends (`?search=`, `?tier=`, `?ownership=`, `?state=`)
- [x] Real-time aggregate analytics endpoint (`/api/colleges/stats/`)
- [x] Backoffice Admin Portal (`/admin/`)
- [x] Database seed script (`backend/seed.py`) with Tier-1 Indian colleges, exams, and programs

---

## Milestone 3 🔜 — AI & Personalisation

- [ ] AI Counselor chatbot (Gemini / Claude) integrated as a floating widget
- [ ] Python-native Cutoff & College Recommendation Engine
- [ ] Exam score trend analysis (historical score vs cutoff comparisons)
- [ ] "What if" score simulator (raise your score by X → see new colleges)
- [ ] Deadline notification triggers

---

## Milestone 4 🔜 — Community & Content

- [ ] College reviews with moderation workflow in Django Admin
- [ ] Q&A section per college
- [ ] Alumni stories and testimonials
- [ ] Verified counselor directory

---

## Milestone 5 🔜 — B2B & Scale

- [ ] Coaching centre & school dashboards
- [ ] Bulk student import and analytics tracking
- [ ] White-label counseling portal for institutes
