"""
api/index.py — Vercel Serverless Function Handler for Django DRF Backend
"""
import os
import sys

# Append backend directory to Python sys.path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "studzens.settings")

from django.core.wsgi import get_wsgi_application
app = get_wsgi_application()
