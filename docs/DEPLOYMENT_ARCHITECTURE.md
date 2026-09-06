# Studzens — Deployment Architecture

## Overview

Studzens uses **Vercel** or **Railway** for hosting the React SPA frontend and **Railway** for hosting the Django 5 Python backend (via Gunicorn). The serverless PostgreSQL database runs on **Neon**.

---

## Services & Processes

| Service | Directory | Platform | Start Command |
|---|---|---|---|
| Frontend | `frontend/` | Vercel or Railway | `npm run preview` or Vercel static build |
| Backend | `backend/` | Railway | `gunicorn studzens.wsgi --log-file -` (declared in `backend/Procfile`) |
| Database | `backend/` | Neon | Cloud PostgreSQL instance |

---

## Backend Deployment (Railway)

The Django backend includes standard deployment configuration files:
- **`backend/Procfile`**: `web: gunicorn studzens.wsgi --log-file -`
- **`backend/runtime.txt`**: `python-3.14.6`
- **`backend/requirements.txt`**: Python dependencies list

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Neon PostgreSQL URL (`postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`) |
| `SECRET_KEY` | ✅ | Django cryptographic signing key |
| `DEBUG` | ⚠️ | Set to `False` in production |
| `ALLOWED_HOSTS` | ✅ | Comma-separated list of allowed domain names (e.g. `*.railway.app,api.studzens.com`) |
| `FRONTEND_ORIGINS` | ✅ | Comma-separated allowed CORS origins (e.g. `https://frontend-git-main-stuzen.vercel.app`) |

---

## Frontend Deployment to Vercel

Deploying the React SPA on Vercel is recommended for global CDN performance.

### Single Page App Routing (`vercel.json`)
Client-side routing with React Router requires all request paths to serve `index.html`. A `vercel.json` file is present in `frontend/`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Vercel Project Settings
1. Go to project **Settings** → **General**.
2. Set **Root Directory** to `frontend`.
3. Vercel automatically detects Vite and builds the client output.

---

## Deployment Workflow

```mermaid
flowchart LR
    DevPush["git push origin main"]
    Vercel["Vercel (Frontend CDN)"]
    Railway["Railway (Django Gunicorn WSGI)"]
    Neon["Neon PostgreSQL Database"]

    DevPush --> Vercel & Railway
    Railway -->|django.db.backends.postgresql| Neon
```

---

## Local Development Setup

```bash
# 1. Start Django Backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r backend/requirements.txt
python backend/manage.py migrate
python backend/seed.py
python backend/manage.py runserver   # http://localhost:8000

# 2. Start React Frontend
npm install
npm run dev --workspace=@studzens/frontend   # http://localhost:5173
```
