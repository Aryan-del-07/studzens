"""
api/apps.py — App configuration for the 'api' Django app.
"""
from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    verbose_name = 'Studzens API'
