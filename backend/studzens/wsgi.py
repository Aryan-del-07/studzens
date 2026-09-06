"""
studzens/wsgi.py — WSGI config for production (gunicorn).
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'studzens.settings')
application = get_wsgi_application()
