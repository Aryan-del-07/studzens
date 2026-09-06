"""
api/views.py

DRF ViewSets and API views for Studzens.
Includes:
  - HealthView                   GET /api/health
  - RegisterView                 POST /api/auth/register
  - CustomTokenObtainPairView    POST /api/auth/login
  - MeView                       GET/PATCH /api/auth/me
  - CollegeViewSet               GET /api/colleges/, /api/colleges/<id>/
  - ExamViewSet                  GET /api/exams/, /api/exams/<id>/
  - ReviewViewSet                GET /api/reviews/, POST /api/reviews/
  - BookmarkViewSet              CRUD /api/bookmarks/
"""

from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets, status, filters, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter, ChoiceFilter

from .models import College, Exam, Review, Bookmark, Tier, Ownership
from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    UserDetailSerializer,
    CollegeListSerializer,
    CollegeDetailSerializer,
    ExamSerializer,
    ReviewSerializer,
    BookmarkSerializer,
)

User = get_user_model()


# ---------------------------------------------------------------------------
# Health Check
# ---------------------------------------------------------------------------

class HealthView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({'status': 'ok', 'message': 'Studzens Django API is running!'})


# ---------------------------------------------------------------------------
# Auth Views
# ---------------------------------------------------------------------------

class RegisterView(generics.CreateAPIView):
    """POST /api/auth/register — Create a new user account."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    """POST /api/auth/login — Returns JWT access + refresh tokens."""
    serializer_class = CustomTokenObtainPairSerializer


class MeView(generics.RetrieveUpdateAPIView):
    """GET/PATCH /api/auth/me — Retrieve or update the current user's profile."""
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ---------------------------------------------------------------------------
# College Filters
# ---------------------------------------------------------------------------

class CollegeFilter(FilterSet):
    tier      = ChoiceFilter(choices=Tier.choices)
    ownership = ChoiceFilter(choices=Ownership.choices)
    state     = CharFilter(lookup_expr='iexact')
    city      = CharFilter(lookup_expr='iexact')

    class Meta:
        model = College
        fields = ['tier', 'ownership', 'state', 'city']


# ---------------------------------------------------------------------------
# College ViewSet
# ---------------------------------------------------------------------------

class CollegeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/colleges/          — Paginated college list with filtering & search
    GET /api/colleges/<id>/     — Full college detail with nested data

    Query params:
      ?search=<name>            — Full-text search on name, city, state
      ?state=<state>            — Filter by state (case-insensitive)
      ?tier=TIER_1|TIER_2|TIER_3
      ?ownership=PRIVATE|GOVERNMENT|SEMI_GOVERNMENT
      ?ordering=avg_package_lpa | nirf_rank | annual_fee_lpa
    """
    queryset = College.objects.prefetch_related(
        'programs', 'placements', 'facilities', 'exams'
    ).all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = CollegeFilter
    search_fields   = ['name', 'short_name', 'city', 'state']
    ordering_fields = ['avg_package_lpa', 'nirf_rank', 'annual_fee_lpa', 'established_year']
    ordering        = ['name']
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CollegeDetailSerializer
        return CollegeListSerializer

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """GET /api/colleges/stats/ — Overall system aggregate metrics."""
        from django.db.models import Avg, Count
        total_colleges = College.objects.count()
        avg_package = College.objects.aggregate(Avg('avg_package_lpa'))['avg_package_lpa__avg'] or 0
        total_exams = Exam.objects.count()

        tier_counts = dict(
            College.objects.values('tier').annotate(count=Count('id')).values_list('tier', 'count')
        )

        return Response({
            'total_colleges': total_colleges,
            'avg_package_lpa': round(avg_package, 2),
            'total_exams': total_exams,
            'tier_distribution': tier_counts,
        })


# ---------------------------------------------------------------------------
# Exam ViewSet
# ---------------------------------------------------------------------------

class ExamViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/exams/         — List all exams
    GET /api/exams/<id>/    — Exam detail
    """
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields   = ['name', 'full_name', 'level']
    ordering        = ['name']
    permission_classes = [permissions.AllowAny]


# ---------------------------------------------------------------------------
# Review ViewSet
# ---------------------------------------------------------------------------

class ReviewViewSet(viewsets.ModelViewSet):
    """
    GET  /api/reviews/              — List all reviews (filterable by college)
    POST /api/reviews/              — Submit a review (auth required)
    GET  /api/reviews/<id>/         — Review detail
    """
    queryset = Review.objects.select_related('user', 'college').all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['college']
    ordering = ['-created_at']

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------------------------------------------------------------------
# Bookmark ViewSet
# ---------------------------------------------------------------------------

class BookmarkViewSet(viewsets.ModelViewSet):
    """
    GET    /api/bookmarks/        — List current user's bookmarks
    POST   /api/bookmarks/        — Add a bookmark
    PATCH  /api/bookmarks/<id>/   — Update bookmark category
    DELETE /api/bookmarks/<id>/   — Remove bookmark
    """
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user).select_related('college')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
