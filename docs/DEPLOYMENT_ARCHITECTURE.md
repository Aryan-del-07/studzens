# Studzens — Deployment Architecture

## Overview

Studzens uses **Railway** to host both the frontend (as a Vite preview server) and the backend (as a Node.js service). The database runs on **Neon** (serverless PostgreSQL).

---

## Services

| Service | Package | Platform | Start Command |
|---|---|---|---|
| Frontend | `@studzens/frontend` | Railway | `npm run preview --workspace=@studzens/frontend` |
| Backend | `@studzens/backend` | Railway | `npm run start --workspace=@studzens/backend` |
| Database | `@studzens/database` | Neon (external) | — managed by Neon |

---

## Environment Variables

### Frontend (Railway)
| Variable | Required | Description |
|---|---|---|
| `PORT` | Set by Railway | The preview server reads this via `${PORT:-4173}` inside the npm script |

### Backend (Railway)
| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Full Neon connection string including `?sslmode=require` |
| `PORT` | Set by Railway | Defaults to `3000` if not set |

---

## Frontend Deployment Note

The `preview` script in `frontend/package.json` is:

```json
"preview": "vite preview --host 0.0.0.0 --port ${PORT:-4173}"
```

**Why this matters:** Passing `--port $PORT` via a Railway run command results in a `CACError` because the shell variable is not expanded before npm passes it to Vite. The `${PORT:-4173}` syntax inside the script ensures the shell running the script expands the variable correctly, with a fallback to `4173` (Vite's default) for local use.

---

## Deployment Flow

```mermaid
flowchart LR
    DevPush["git push origin main"]
    Railway["Railway detects push"]
    BuildFE["Build: npm run build --workspace=@studzens/frontend"]
    BuildBE["Build: npm run build --workspace=@studzens/backend"]
    StartFE["Start: npm run preview --workspace=@studzens/frontend"]
    StartBE["Start: npm run start --workspace=@studzens/backend"]

    DevPush --> Railway
    Railway --> BuildFE & BuildBE
    BuildFE --> StartFE
    BuildBE --> StartBE
```

---

## Infrastructure

```
Internet
    │
    ├── *.railway.app/frontend ──→ Vite preview (React SPA)
    │                              PORT env var from Railway
    │
    └── *.railway.app/backend  ──→ Express API (Node 22)
                                   PORT env var from Railway
                                   DATABASE_URL → Neon Postgres
```

---

## Local Development

```sh
# Install all workspaces
npm install

# Start frontend dev server (hot reload)
npm run dev --workspace=@studzens/frontend   # http://localhost:5173

# Start backend dev server (tsx watch)
npm run dev --workspace=@studzens/backend    # http://localhost:3000

# Or start both simultaneously
npm run dev   # runs dev in all workspaces
```
