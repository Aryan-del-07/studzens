<div align="center">

# ⚡ Studzens

### India's Smartest College Finder & Decision Engine

**Enter your exam scores → Get your personalised Safe / Reach / Backup college list instantly.**

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)

<br/>

[🚀 **Live Demo**](https://studzens-frontend-production.up.railway.app) &nbsp;·&nbsp;
[📖 **Docs**](./docs/) &nbsp;·&nbsp;
[🐛 **Report a Bug**](https://github.com/Aryan-del-07/studzens/issues/new?template=bug_report.md) &nbsp;·&nbsp;
[💡 **Request a Feature**](https://github.com/Aryan-del-07/studzens/issues/new?template=feature_request.md)

</div>

---

## 📸 What It Looks Like

> Students enter their JEE / NEET / BITSAT / CLAT scores → Studzens ranks every college as **Safe Reach**, **Safe**, or **Safe Backup** — no guessing, no spreadsheets.

| Landing Page | Dashboard | College Profile |
|:---:|:---:|:---:|
| Hero with smart CTA | Personalised recommendations | Full tabs: programmes, placements, map |

---

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 🎯 **Match Score** | Ranks colleges by how well your scores match their cutoffs |
| 🔴🟡🟢 **Safe / Reach / Backup** | Every college gets an instant label so you always know your odds |
| 📚 **Exam Hub** | 50+ national & state exams with deadlines, patterns, and syllabus |
| 🏛️ **College Directory** | 100+ colleges — programmes, fees, placements, facilities |
| ⚖️ **Side-by-Side Compare** | Compare any colleges on every metric at once |
| 🗺️ **Interactive Map** | State-wise college density with transport access overlay |
| 🧭 **Career Explorer** | Discover career paths, required exams, and connected colleges |
| 🔔 **Notifications** | In-app deadline reminders and match updates |

---

## 🏗️ Architecture

Studzens is a **single npm monorepo** with three independent packages:

```
studzens/
├── frontend/   →  React 19 + Vite 8 SPA         (deployed on Railway)
├── backend/    →  Express 4 + Node 22 REST API  (deployed on Railway)
└── database/   →  Prisma schema + seed data     (Neon PostgreSQL)
```

```
Browser  ──HTTPS──▶  Vite Preview (Railway)
Browser  ──REST───▶  Express API  (Railway)
Express  ──Prisma──▶  Neon PostgreSQL
```

> Full architecture diagrams → [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

| Tool | Minimum Version | Check |
|---|---|---|
| Node.js | 18+ | `node -v` |
| npm | 8+ | `npm -v` |
| Git | Any | `git --version` |

You also need a **free [Neon](https://neon.tech) PostgreSQL database** (takes 30 seconds to create).

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/Aryan-del-07/studzens.git
cd studzens
npm install          # installs all three workspaces in one shot
```

---

### Step 2 — Set Up Environment Variables

Create a `.env` file inside the `database/` folder:

```bash
# database/.env
DATABASE_URL="postgres://user:password@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

Create a `.env` file inside the `backend/` folder:

```bash
# backend/.env
DATABASE_URL="postgres://user:password@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
PORT=3000
```

> 💡 Get your `DATABASE_URL` from your [Neon dashboard](https://console.neon.tech) → Project → Connection string.

---

### Step 3 — Set Up the Database

```bash
cd database
npx prisma generate     # generate the Prisma client
npx prisma db push      # push the schema to your database
npm run db:seed         # populate with 100+ colleges & 50+ exams
cd ..
```

---

### Step 4 — Run the App

```bash
# Start the frontend only (fastest way to see the UI)
npm run dev --workspace=@studzens/frontend
# → Opens at http://localhost:5173

# Start the backend only
npm run dev --workspace=@studzens/backend
# → Runs at http://localhost:3000

# Start both at once
npm run dev
```

That's it! Open **http://localhost:5173** and you're in. 🎉

---

## 📁 Folder Structure (Quick Reference)

```
studzens/
│
├── frontend/src/
│   ├── pages/              ← 13 route-level pages (Landing, Dashboard, Search …)
│   ├── components/layout/  ← PageShell (navbar + mobile nav)
│   ├── contexts/           ← Auth, Bookmark, Notification, StudentProfile
│   ├── api/mocks/          ← Static data: colleges, exams, careers
│   ├── hooks/              ← useLocalStorage, useSearch
│   ├── types/              ← TypeScript interfaces
│   └── styles/index.css    ← Global styles + Tailwind 4
│
├── backend/src/
│   ├── index.ts            ← Express entry (middleware + routes)
│   ├── db.ts               ← Prisma singleton
│   └── routes/             ← colleges, users, reviews
│
├── database/prisma/
│   ├── schema.prisma       ← Full data model
│   └── seed.ts             ← Seed 100+ colleges & 50+ exams
│
└── docs/                   ← All documentation (see below)
```

---

## 📖 Documentation

All documentation lives in the [`docs/`](./docs/) folder:

| Document | What it covers |
|---|---|
| [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | System diagram, package graph, key design decisions |
| [`FRONTEND_ARCHITECTURE.md`](./docs/FRONTEND_ARCHITECTURE.md) | React component hierarchy, routing, styling system |
| [`BACKEND_ARCHITECTURE.md`](./docs/BACKEND_ARCHITECTURE.md) | Express routes, middleware stack, API reference |
| [`DATABASE_ARCHITECTURE.md`](./docs/DATABASE_ARCHITECTURE.md) | Prisma schema, ER diagram, all models explained |
| [`DEPLOYMENT_ARCHITECTURE.md`](./docs/DEPLOYMENT_ARCHITECTURE.md) | Railway setup, env vars, deployment flow |
| [`STATE_MANAGEMENT.md`](./docs/STATE_MANAGEMENT.md) | All React contexts and custom hooks |
| [`USER_FLOW.md`](./docs/USER_FLOW.md) | User journeys with Mermaid diagrams |
| [`ROADMAP.md`](./docs/ROADMAP.md) | What's done and what's coming next |
| [`PROJECT_STRUCTURE.md`](./docs/PROJECT_STRUCTURE.md) | Full file tree with explanations |
| [`CHANGELOG.md`](./docs/CHANGELOG.md) | Version history of all changes |
| [`CONTRIBUTING.md`](./docs/CONTRIBUTING.md) | How to contribute, code standards, commit format |

---

## 🌐 Deployment

Both services are deployed on **Railway**:

| Service | Start Command |
|---|---|
| Frontend | `npm run preview --workspace=@studzens/frontend` |
| Backend | `npm run start --workspace=@studzens/backend` |

The preview script automatically reads `$PORT` from Railway:
```json
"preview": "vite preview --host 0.0.0.0 --port ${PORT:-4173}"
```

> Full deployment guide → [`docs/DEPLOYMENT_ARCHITECTURE.md`](./docs/DEPLOYMENT_ARCHITECTURE.md)

---

## 🤝 Contributing

Contributions are very welcome! Here's the quick version:

1. Fork → `git clone` → `npm install`
2. Create a branch: `git checkout -b feature/your-feature`
3. Make changes, then: `npm run build --workspace=@studzens/frontend`
4. Commit: `git commit -m "feat: your feature description"`
5. Push & open a Pull Request to `main`

Read the full guide → [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md)

---

## 🗺️ Roadmap

- ✅ **v0.1** — Core SPA with mock data, routing, auth
- ✅ **v0.3** — All 13 pages, 4 contexts, MapLibre map, Career Explorer
- 🚧 **v0.4** — Connect frontend to live backend API (replace mocks)
- 🔜 **v0.5** — JWT auth, real college search, bookmark sync
- 🔜 **v1.0** — AI counselor, smart match algorithm, exam notifications

See the full roadmap → [`docs/ROADMAP.md`](./docs/ROADMAP.md)

---

## 📜 License

Distributed under the **MIT License** — use it freely, just give credit.

---

<div align="center">

Built with ❤️ for Indian students, by Indian students.

⭐ **Star this repo** if Studzens helped you!

</div>
