# Studzens Django Backend Architecture

## Overview
Studzens backend is built using **Django 5.1** and **Django REST Framework (DRF)**, connected to a **Neon PostgreSQL** cloud database.

## Directory Structure
```
backend/
├── api/
│   ├── admin.py        # Custom Django Admin registrations
│   ├── apps.py         # Django app config
│   ├── migrations/     # Django ORM DB migrations
│   ├── models.py       # User, Profile, College, Program, Placement, Review, Exam, CollegeExam, Bookmark, Facility
│   ├── serializers.py  # DRF serializers for API serialization and validation
│   ├── urls.py         # DRF routing for auth, health, colleges, exams, reviews, bookmarks
│   └── views.py        # DRF ViewSets & JWT Auth API views
├── studzens/
│   ├── __init__.py
│   ├── settings.py     # Django settings (Neon DB, SimpleJWT, CORS, django-filter)
│   ├── urls.py         # Root URLconf
│   └── wsgi.py         # Gunicorn WSGI production entrypoint
├── manage.py           # Django CLI utility
├── Procfile            # Deployment process definition (gunicorn studzens.wsgi)
├── requirements.txt    # Python dependencies
├── runtime.txt         # Python runtime version (3.14)
└── seed.py             # Initial database seed script
```

## Key Technologies
- **Framework**: Django 5.1 & Django REST Framework 3.15
- **Database**: PostgreSQL (Neon Serverless) via `psycopg` (v3)
- **Auth**: `djangorestframework-simplejwt` (JSON Web Tokens)
- **CORS**: `django-cors-headers`
- **Filtering**: `django-filter`
- **Production Server**: Gunicorn

## API Endpoints
| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| `/api/health/` | GET | Health check status | No |
| `/api/auth/register/` | POST | Register new user | No |
| `/api/auth/login/` | POST | Login and receive JWT access/refresh tokens | No |
| `/api/auth/refresh/` | POST | Refresh expired access token | No |
| `/api/auth/me/` | GET, PATCH | Get / update user profile | Yes |
| `/api/colleges/` | GET, POST | List/Filter colleges, create college | GET: No, POST: Admin |
| `/api/colleges/{id}/` | GET, PUT, DELETE | College details | GET: No, Mod: Admin |
| `/api/exams/` | GET | List available entrance exams | No |
| `/api/reviews/` | GET, POST | College reviews | POST: Yes |
| `/api/bookmarks/` | GET, POST, DELETE | User saved college bookmarks | Yes |
| `/admin/` | GET, POST | Django Admin Portal | Staff/Admin |

## Database Seeding
To populate seed data:
```bash
python backend/seed.py
```
