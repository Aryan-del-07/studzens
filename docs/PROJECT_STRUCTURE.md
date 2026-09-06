# Project Structure Guide

Studzens uses a decoupled project architecture: a **React 19 SPA** frontend and a **Django 5 + Django REST Framework** backend.

---

## Top-Level Layout

```
studzens/                        ← Repository root
├── frontend/                    ← React 19 + Vite 8 SPA
├── backend/                     ← Django 5.1 REST API + Admin
│   ├── api/                     ← Django app (models, views, serializers, urls, admin)
│   ├── studzens/                ← Django project settings, WSGI, URLs
│   ├── manage.py                ← Django CLI utility
│   ├── requirements.txt         ← Python dependencies
│   ├── Procfile                 ← Deployment process declaration
│   └── seed.py                  ← Database seed script
├── docs/                        ← System & architecture documentation
└── package.json                 ← Root package management
```

---

## `backend/` — Django REST Framework API

```
backend/
├── api/
│   ├── admin.py                 ← Custom Django Admin configuration (/admin/)
│   ├── apps.py                  ← Django AppConfig
│   ├── migrations/              ← Versioned DB migration files
│   ├── models.py                ← 10 Django ORM models (User, College, Exam, etc.)
│   ├── serializers.py           ← DRF ModelSerializers & JWT auth serializers
│   ├── urls.py                  ← DRF ViewSet routers & auth URLs
│   └── views.py                 ← ViewSets (Colleges, Exams, Reviews, Bookmarks, Stats)
├── studzens/
│   ├── __init__.py
│   ├── settings.py              ← Neon DB, SimpleJWT, CORS, django-filter
│   ├── urls.py                  ← Root URLconf (/admin/, /api/)
│   └── wsgi.py                  ← Gunicorn WSGI production entry point
├── manage.py                    ← Django CLI manager
├── Procfile                     ← Gunicorn web process
├── requirements.txt             ← Python dependencies
├── runtime.txt                  ← Python 3.14 declaration
└── seed.py                      ← Seed script for database tables
```

---

## `frontend/` — React SPA

```
frontend/
├── public/
│   ├── logo.png                 ← App logo used in the navbar
│   └── favicon.svg
├── src/
│   ├── main.tsx                 ← Vite entry — mounts <App /> + global providers
│   ├── app/
│   │   └── App.tsx              ← BrowserRouter + all Routes (lazy-loaded pages)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── ErrorBoundary.tsx ← Global React error boundary
│   │   └── layout/
│   │       └── PageShell.tsx    ← Sticky header + mobile bottom nav + <Outlet />
│   │
│   ├── contexts/                ← Global React Context providers
│   │   ├── AuthContext.tsx      ← JWT token management, user state
│   │   ├── BookmarkContext.tsx  ← Saved colleges
│   │   ├── NotificationContext.tsx ← In-app toast notifications
│   │   └── StudentProfileContext.tsx ← Onboarding data (stream, marks, budget, states)
│   │
│   ├── pages/                   ← Route-level page components (13 total)
│   │   ├── LandingPage.tsx      ← Public marketing page
│   │   ├── LoginPage.tsx        ← Sign-in / sign-up form
│   │   ├── OnboardingPage.tsx   ← Multi-step profile setup wizard
│   │   ├── DashboardPage.tsx    ← Personalised hub (recommendations, countdowns)
│   │   ├── SearchPage.tsx       ← Filterable college directory
│   │   ├── CollegeProfilePage.tsx ← Full college detail with tabs
│   │   ├── ComparePage.tsx      ← Side-by-side college comparison
│   │   ├── ExamHubPage.tsx      ← Full exam list with filter & calendar
│   │   ├── ExamDetailsPage.tsx  ← Single exam detail view
│   │   ├── CareerExplorerPage.tsx ← Career paths explorer
│   │   ├── MapPage.tsx          ← Interactive MapLibre GL map
│   │   ├── ProfilePage.tsx      ← User profile & preferences editor
│   │   └── NotFoundPage.tsx     ← 404 fallback
│   │
│   ├── styles/
│   │   └── index.css            ← Tailwind 4 imports + custom styling tokens
│   └── utils/                   ← Pure helper functions
│
├── package.json                 ← @studzens/frontend — scripts: dev, build, preview
└── vite.config.ts
```

---

## Where Do I Put a New…?

| What you're adding | Where it goes |
|---|---|
| New page / screen | `frontend/src/pages/NewPage.tsx` + add `<Route>` in `App.tsx` |
| Reusable UI component | `frontend/src/components/common/` |
| New API endpoint | Add ViewSet/APIView in `backend/api/views.py` + register in `backend/api/urls.py` |
| New DB table / field | Add model in `backend/api/models.py` + run `python manage.py makemigrations api` |
| Admin customization | Update `backend/api/admin.py` |
