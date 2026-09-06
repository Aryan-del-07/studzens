"""
api/urls.py — URL routing for all API endpoints.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    HealthView,
    RegisterView,
    CustomTokenObtainPairView,
    MeView,
    CollegeViewSet,
    ExamViewSet,
    ReviewViewSet,
    BookmarkViewSet,
)

# DRF router auto-generates list/detail URLs for ViewSets
router = DefaultRouter()
router.register(r'colleges',  CollegeViewSet,  basename='college')
router.register(r'exams',     ExamViewSet,     basename='exam')
router.register(r'reviews',   ReviewViewSet,   basename='review')
router.register(r'bookmarks', BookmarkViewSet, basename='bookmark')

urlpatterns = [
    # Health
    path('health', HealthView.as_view(), name='health'),
    path('health/', HealthView.as_view(), name='health-slash'),

    # Auth
    path('auth/register', RegisterView.as_view(),               name='auth-register'),
    path('auth/register/', RegisterView.as_view(),              name='auth-register-slash'),
    path('auth/login',    CustomTokenObtainPairView.as_view(),   name='auth-login'),
    path('auth/login/',   CustomTokenObtainPairView.as_view(),   name='auth-login-slash'),
    path('auth/refresh',  TokenRefreshView.as_view(),            name='auth-refresh'),
    path('auth/refresh/', TokenRefreshView.as_view(),           name='auth-refresh-slash'),
    path('auth/me',       MeView.as_view(),                      name='auth-me'),
    path('auth/me/',      MeView.as_view(),                      name='auth-me-slash'),

    # Resources (router-generated)
    path('', include(router.urls)),
]
