# StudZens

An AI-powered college recommendation platform for Indian students. Enter your entrance exam scores, get colleges ranked by how well they match — no spreadsheets, no guessing.

**[Live Demo](https://studzens-frontend-production.up.railway.app)** · **[Architecture Docs](./docs/ARCHITECTURE.md)** · **[Full Documentation](./docs/)**

---

## The Problem

Every year, millions of Indian students take entrance exams like JEE, NEET, BITSAT, and CLAT. After results come out, they face the same problem: *which colleges can I actually get into?*

The current process involves manually cross-referencing cutoff lists across dozens of colleges, comparing fees, checking placements, and hoping you don't miss a good option. Most students either rely on expensive counselors or make decisions with incomplete information.

## What StudZens Does

Students enter their exam scores. StudZens runs a scoring algorithm that ranks every college in the database as **Safe Reach**, **Safe**, or **Safe Backup** based on the student's specific profile — scores, budget, preferred stream, and location.

Beyond matching, students can:
- Compare colleges side-by-side on every metric
- Explore 50+ entrance exams with deadlines and syllabus info
- Discover career paths and which exams lead to them
- View colleges on an interactive map with state-wise density
- Get a personalized dashboard with exam countdowns and daily priorities

---

## Features

| Feature | Description |
|---------|-------------|
| **Match Scoring** | Ranks colleges 0–100 based on eligibility, budget fit, and stream alignment |
| **Safe / Reach / Backup** | Every college gets an instant label so students know their odds |
| **College Search & Filter** | Filter by state, stream, fees, ownership, and tier |
| **Side-by-Side Compare** | Compare any colleges on programmes, fees, placements, and facilities |
| **Exam Hub** | 50+ national and state exams with deadlines, patterns, and syllabus |
| **Career Explorer** | Discover career paths, required exams, and connected colleges |
| **Interactive Map** | MapLibre GL map with state-wise college density |
| **Personalized Dashboard** | Exam countdowns, match recommendations, readiness score, daily priorities |
| **Bookmarks & Notifications** | Save colleges, get deadline reminders and match updates |
| **Mobile Responsive** | Full mobile layout with bottom tab navigation |

---

## Architecture

StudZens is a **monorepo** with three packages managed via npm workspaces:

```
studzens/
├── frontend/   →  React 19 + Vite 8 SPA         (deployed on Railway)
├── backend/    →  Express 4 + Node 22 REST API   (deployed on Railway)
└── database/   →  Prisma schema + seed data      (Neon PostgreSQL)
```

```
Browser  ──HTTPS──▶  Vite Preview (Railway)
Browser  ──REST──▶   Express API  (Railway)
Express  ──Prisma──▶ Neon PostgreSQL
```

### Frontend
- **13 route-level pages** with React.lazy code-splitting
- **4 React contexts** for auth, bookmarks, notifications, and student profile
- **Protected routes** for authenticated features (dashboard, profile, onboarding)
- **Custom hooks** for localStorage persistence and search

### Backend
- Express with Helmet (security headers), CORS, and JSON middleware
- RESTful routes: `/api/colleges`, `/api/users`, `/api/reviews`
- Zod for request validation
- Prisma Client for type-safe database queries

### Database
- PostgreSQL on Neon (serverless)
- 9 models: User, Profile, College, Program, Placement, Review, Exam, Bookmark, Facility
- Seed script populates 100+ colleges and 50+ exams
- Indexed on common query patterns (city/state, tier, college+year)

> Full architecture diagrams → [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4, Vite 8 | Modern SPA with fast HMR and utility-first styling |
| **Routing** | React Router v7 | Nested layouts, protected routes, lazy loading |
| **Maps** | MapLibre GL + react-map-gl | Open-source, no API key required for map tiles |
| **Icons** | Lucide React | Consistent, tree-shakeable icon set |
| **Backend** | Express 4, Node.js 22, TypeScript | Lightweight REST API with middleware ecosystem |
| **Validation** | Zod | Runtime request validation with TypeScript inference |
| **ORM** | Prisma | Type-safe queries, schema-as-code, migrations |
| **Database** | Neon PostgreSQL | Serverless Postgres with connection pooling |
| **Deployment** | Railway | Both frontend (static preview) and backend (always-on) |

---

## How It Works

```
1. Student signs up → completes onboarding wizard (exam scores, budget, stream, location)
2. Scoring engine runs → ranks all colleges against the student's profile
3. Dashboard shows → top matches, exam countdowns, readiness score, daily priorities
4. Student explores → search, filter, compare colleges, view on map
5. Student saves → bookmark colleges as Dream / Target / Safety
```

The core scoring logic lives in [`collegeIntelligence.ts`](./frontend/src/utils/collegeIntelligence.ts) — it calculates match scores based on eligibility against cutoffs, budget fit (penalizes colleges exceeding the student's budget), and stream alignment.

---

## Running Locally

### Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18+ | `node -v` |
| npm | 8+ | `npm -v` |
| Git | Any | `git --version` |

You'll also need a free [Neon](https://neon.tech) PostgreSQL database (takes 30 seconds to set up).

### Setup

```bash
# Clone and install all workspaces
git clone https://github.com/Aryan-del-07/studzens.git
cd studzens
npm install

# Set up environment variables
# database/.env and backend/.env both need:
# DATABASE_URL="postgres://user:password@ep-xxxx.aws.neon.tech/neondb?sslmode=require"

# Initialize the database
cd database
npx prisma generate
npx prisma db push
npm run db:seed        # Seeds 100+ colleges and 50+ exams
cd ..

# Start everything
npm run dev
# Frontend → http://localhost:5173
# Backend  → http://localhost:3000
```

---

## Current Status

### ✅ Complete (Milestone 1)
- Full React SPA with 13 pages, 4 contexts, and protected routing
- College scoring engine with Safe/Reach/Backup classification
- Express backend with Prisma ORM and Neon PostgreSQL
- 100+ colleges and 50+ exams seeded with real data
- Interactive MapLibre GL map with state-wise density
- Career explorer, exam hub, side-by-side compare
- Mobile responsive layout
- Deployed on Railway (frontend + backend)

### 🔄 In Progress (Milestone 2)
- Connecting frontend to live backend API (currently using mock data on the frontend)
- JWT-based authentication (replacing mock auth context)
- Server-side college search with pagination and filtering
- Bookmark sync to database

### 🔮 Planned
- AI counselor chatbot (Gemini integration)
- "What-if" simulator — raise your score by X, see how many new colleges open up
- Exam score trend analysis against historical cutoffs
- Personalized deadline notifications

> Full roadmap → [`docs/ROADMAP.md`](./docs/ROADMAP.md)

---

## Screenshots

> Screenshots coming soon. Key screens to capture:
> 1. Landing page hero
> 2. Dashboard with match recommendations
> 3. College profile page (programmes, placements, facilities tabs)
> 4. Side-by-side compare view
> 5. Interactive map
> 6. Exam Hub
> 7. Mobile responsive layout

---

## Documentation

All documentation lives in [`docs/`](./docs/):

| Document | Covers |
|----------|--------|
| [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | System diagram, package graph, design decisions |
| [`FRONTEND_ARCHITECTURE.md`](./docs/FRONTEND_ARCHITECTURE.md) | Component hierarchy, routing, styling |
| [`BACKEND_ARCHITECTURE.md`](./docs/BACKEND_ARCHITECTURE.md) | Express routes, middleware, API reference |
| [`DATABASE_ARCHITECTURE.md`](./docs/DATABASE_ARCHITECTURE.md) | Prisma schema, ER diagram, all models |
| [`DEPLOYMENT_ARCHITECTURE.md`](./docs/DEPLOYMENT_ARCHITECTURE.md) | Railway setup, env vars, deployment flow |
| [`STATE_MANAGEMENT.md`](./docs/STATE_MANAGEMENT.md) | React contexts and custom hooks |
| [`ROADMAP.md`](./docs/ROADMAP.md) | What's done and what's next |
| [`CONTRIBUTING.md`](./docs/CONTRIBUTING.md) | How to contribute |

---

## Contributing

1. Fork → `git clone` → `npm install`
2. Create a branch: `git checkout -b feature/your-feature`
3. Make changes, build: `npm run build --workspace=@studzens/frontend`
4. Commit: `git commit -m "feat: your feature description"`
5. Push and open a Pull Request

Full guide → [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md)

---

## License

MIT — use it freely, just give credit.