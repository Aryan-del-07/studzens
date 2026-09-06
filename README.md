# StudZens

An AI-powered college intelligence and recommendation platform for Indian students. Enter your entrance exam scores, get colleges ranked by how well they match — no spreadsheets, no guessing.

**[Live Web App](https://frontend-git-main-stuzen.vercel.app)** · **[Backend API](./docs/BACKEND_ARCHITECTURE.md)** · **[Full Architecture Docs](./docs/ARCHITECTURE.md)**

---

## 🎯 The Problem

Every year, millions of Indian students take entrance exams like JEE Advanced, JEE Main, NEET, BITSAT, and UGEE. After results come out, they face a stressful question: *which colleges can I actually get into?*

The current process involves manually cross-referencing cutoff lists across dozens of colleges, comparing fees, checking placements, and hoping you don't miss a great option. Most students either rely on expensive counselors or make decisions with incomplete information.

## 🚀 What StudZens Does

Students enter their exam scores, budget, location preferences, and target stream. StudZens runs an intelligent match algorithm that classifies and ranks colleges as **Dream**, **Target**, or **Safety** based on the student's specific profile.

Beyond matching, students can:
- **Compare Colleges**: Side-by-side comparison on every metric (NIRF rank, avg package LPA, annual fee, facilities, programs)
- **Exam Command Center**: 50+ national and state entrance exams with deadlines, levels, and syllabus info
- **Career Explorer**: Discover career paths, required entrance exams, and connected institutions
- **Interactive Density Map**: MapLibre GL map displaying state-wise college density and location pins
- **Student Dashboard**: Exam countdowns, match recommendations, readiness score, and daily priorities
- **Django Control Center**: Production-ready Admin Portal (`/admin/`) for institutional data management

---

## ✨ Features

| Feature | Description |
|---|---|
| **Match Scoring** | Ranks colleges 0–100 based on eligibility, budget fit, and stream alignment |
| **Dream / Target / Safety** | Every college gets an instant label so students know their exact admission odds |
| **College Search & Filter** | Real-time filtering by state, city, tier (`TIER_1`, `TIER_2`, `TIER_3`), ownership, and fee |
| **Side-by-Side Compare** | Compare colleges on programmes, fees, placements, and facilities |
| **Exam Hub** | 50+ national and state exams with deadlines, patterns, and levels |
| **Career Explorer** | Discover career paths, required exams, and connected colleges |
| **Interactive Map** | MapLibre GL map with state-wise college density |
| **Personalized Dashboard** | Exam countdowns, match recommendations, readiness score, daily priorities |
| **Django Admin Portal** | Full backoffice management interface (`/admin/`) for colleges, programs, placements, reviews & users |
| **JWT Authentication** | Secure token-based registration & authentication via SimpleJWT |

---

## 🏗️ Architecture

StudZens uses a modern decoupled architecture:

```
studzens/
├── frontend/   →  React 19 + Vite 8 SPA          (deployed on Vercel / Railway)
├── backend/    →  Django 5 + REST Framework API  (deployed on Railway with Gunicorn)
└── docs/       →  Comprehensive System & Architecture Documentation
```

```
Browser  ──HTTPS──▶  React 19 SPA (Vercel)
Browser  ──REST──▶   Django 5 REST API (Railway / Gunicorn)
Django   ──psycopg──▶ Neon PostgreSQL (Cloud DB)
```

### Frontend
- **React 19 & Vite 8 SPA** with fast HMR and route-level code splitting
- **4 React Contexts** for auth, bookmarks, notifications, and student profile
- **MapLibre GL & Tailwind CSS** for responsive map visualizations & dynamic UI

### Backend
- **Django 5.1 & Django REST Framework 3.15** REST API
- **SimpleJWT** for access & refresh token authentication
- **Django Filter & SearchBackends** for real-time querying (`?search=`, `?tier=`, `?ownership=`)
- **Built-in Admin Panel** (`/admin/`) for administrative management

### Database
- **Neon PostgreSQL** serverless cloud database
- **10 Django ORM Models**: `User`, `Profile`, `College`, `Program`, `Placement`, `Review`, `Exam`, `CollegeExam`, `Bookmark`, `Facility`
- Indexed on common query patterns (`city`, `state`, `tier`, `ownership`)

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS, Vite 8 | Modern SPA with ultra-fast HMR and utility-first styling |
| **Routing** | React Router v7 | Nested layouts, protected routes, lazy loading |
| **Maps** | MapLibre GL | Open-source vector maps without API key restrictions |
| **Backend** | Django 5.1, Django REST Framework 3.15, Python 3.14 | Robust, batteries-included REST API with built-in ORM, admin & security |
| **Auth** | SimpleJWT | JSON Web Token authentication with refresh token support |
| **Filtering** | `django-filter` | Declarative URL query parameters for backend search & filtering |
| **Database** | Neon PostgreSQL | High-performance serverless PostgreSQL |
| **Deployment** | Gunicorn + Railway / Vercel | Production WSGI app server & static CDN host |

---

## ⚡ Running Locally

### Prerequisites
- **Python 3.10+** (`python --version`)
- **Node.js 18+** (`node -v`)
- **Git** (`git --version`)

### 1. Setup Backend (Django)

```bash
# Navigate to project root
cd studzens

# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\activate   # Windows (or source .venv/bin/activate on Linux/Mac)

# Install Python dependencies
pip install -r backend/requirements.txt

# Run migrations against database
python backend/manage.py migrate

# Seed sample data (colleges, exams, programs, admin user)
python backend/seed.py

# Start Django development server
python backend/manage.py runserver
# API running at http://localhost:8000/api/
# Admin running at http://localhost:8000/admin/
```

### 2. Setup Frontend (React)

```bash
# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
# Frontend running at http://localhost:5173
```

---

## 📚 API Overview

| Endpoint | Method | Description | Auth Required |
|---|---|---|---|
| `/api/health/` | GET | Health check status | No |
| `/api/auth/register/` | POST | Register a new user | No |
| `/api/auth/login/` | POST | Login and obtain JWT tokens | No |
| `/api/auth/refresh/` | POST | Refresh JWT access token | No |
| `/api/auth/me/` | GET, PATCH | Retrieve/update user profile | Yes |
| `/api/colleges/` | GET | List/search/filter colleges | No |
| `/api/colleges/stats/` | GET | Real-time aggregate college metrics | No |
| `/api/exams/` | GET | List entrance exams | No |
| `/api/reviews/` | GET, POST | Read or submit college reviews | POST: Yes |
| `/api/bookmarks/` | GET, POST, DELETE | Manage saved college bookmarks | Yes |
| `/admin/` | GET, POST | Django Admin Portal | Staff/Admin |

---

## 📄 License

MIT — use it freely, just give credit.