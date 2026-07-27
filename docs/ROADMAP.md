# Studzens — Roadmap

## Milestone 1 ✅ — Foundation (Complete)

- [x] React + Vite SPA with TypeScript
- [x] React Router v7 with protected routes
- [x] AuthContext (login / logout / session persistence)
- [x] Static mock data: 100+ colleges, 50+ exams, careers
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
- [x] BookmarkContext with localStorage persistence
- [x] NotificationContext (in-app toasts)
- [x] StudentProfileContext
- [x] Mobile responsive layout + bottom tab bar
- [x] Express backend with Prisma + Neon Postgres
- [x] Railway deployment (frontend + backend)

---

## Milestone 2 🚧 — Live Data Integration

- [ ] Connect frontend to real backend API (replace mock data)
- [ ] JWT-based authentication (replace mock AuthContext)
- [ ] Real college data seeded via `database/prisma/seed.ts`
- [ ] Live college search with server-side pagination & filtering
- [ ] User review submission via `POST /api/reviews`
- [ ] Bookmark sync to database (`POST /api/bookmarks`)

---

## Milestone 3 🔜 — AI & Personalisation

- [ ] AI Counselor chatbot (Gemini / GPT-4) integrated as a floating widget
- [ ] Smart match score algorithm using real cutoff data
- [ ] Exam score trend analysis (how your score compares to past cutoffs)
- [ ] Personalized notification system (deadline reminders, cutoff updates)
- [ ] "What if" simulator (raise your score by X → how many new colleges open up?)

---

## Milestone 4 🔜 — Community & Content

- [ ] College reviews with moderation workflow
- [ ] Q&A section per college (students asking / answering)
- [ ] Alumni stories and testimonials
- [ ] Counselor directory (human counselors for premium tier)

---

## Milestone 5 🔜 — B2B & Scale

- [ ] School / coaching centre dashboards
- [ ] Bulk student import and progress tracking
- [ ] White-label counseling portal for coaching institutes
- [ ] Analytics: conversion rates, application outcomes

---

## Continuous

- Performance monitoring (Core Web Vitals)
- Accessibility (WCAG 2.1 AA)
- Security audits
- Mobile app (React Native / Flutter — post-v1)
