# Studzens — Backend Architecture

## Overview

The backend is a lightweight **Express 4** REST API written in **TypeScript 6**, running on **Node 22**. It acts as a thin data-access layer over the Prisma ORM, which connects to a **Neon PostgreSQL** database.

> **Note:** The frontend currently uses static mock data. The backend is live and ready for integration — it will progressively replace mock data as the project matures.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 22 | Runtime |
| TypeScript | 6 | Static typing |
| Express | 4 | HTTP framework |
| Prisma | 7 | ORM + query builder |
| `@prisma/adapter-pg` | 7 | Prisma → `pg` driver adapter |
| `pg` | 8 | PostgreSQL client |
| `helmet` | 8 | HTTP security headers |
| `cors` | 2 | Cross-origin resource sharing |
| `dotenv` | 16 | Environment variable loading |
| `zod` | 3 | Request body validation |
| `tsx` | 4 | TypeScript watch runner (dev only) |

---

## Directory Structure

```
backend/
├── src/
│   ├── index.ts          ← Express app setup + route registration
│   ├── db.ts             ← Prisma Client singleton
│   └── routes/
│       ├── colleges.ts   ← /api/colleges
│       ├── users.ts      ← /api/users
│       └── reviews.ts    ← /api/reviews
├── dist/                 ← Compiled JS output (tsc)
├── tsconfig.json
└── package.json          ← @studzens/backend
```

---

## Middleware Stack (in order)

```
Request
  → helmet()          ← Adds X-Frame-Options, CSP, HSTS, etc.
  → cors()            ← Allows cross-origin requests from the frontend
  → express.json()    ← Parses JSON request bodies
  → Route handlers
Response
```

---

## API Endpoints

### Health

| Method | Path | Response |
|---|---|---|
| `GET` | `/api/health` | `{ status: "ok", message: "..." }` |

### Colleges

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/colleges` | Returns all colleges from the database |

### Users

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/users` | Returns all users |
| `POST` | `/api/users` | Creates a new user |

### Reviews

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/reviews` | Returns all reviews |
| `POST` | `/api/reviews` | Submits a new review |

---

## Database Connection (`db.ts`)

A **singleton** Prisma Client is exported so that the entire application shares one connection pool:

```typescript
// src/db.ts
import { PrismaClient } from '@studzens/database';
export const prisma = new PrismaClient();
```

The `DATABASE_URL` is loaded from the environment via `dotenv`.

---

## Scripts

```sh
npm run dev    # tsx watch src/index.ts  (hot-reload on file change)
npm run build  # tsc → dist/
npm run start  # node dist/index.js  (production)
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Full Neon/Postgres connection string |
| `PORT` | Optional | HTTP port (defaults to `3000`) |
