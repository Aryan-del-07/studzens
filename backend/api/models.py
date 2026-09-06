"""
api/models.py

Django ORM models for Studzens.
Mirrors the original Prisma schema exactly:
  User, Profile, College, Program, Placement,
  Review, Exam, CollegeExam, Bookmark, Facility
"""
import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


# ---------------------------------------------------------------------------
# CHOICES  (replaces Prisma enums)
# ---------------------------------------------------------------------------

class Role(models.TextChoices):
    STUDENT   = 'STUDENT',   'Student'
    ADMIN     = 'ADMIN',     'Admin'
    MODERATOR = 'MODERATOR', 'Moderator'


class Tier(models.TextChoices):
    TIER_1 = 'TIER_1', 'Tier 1'
    TIER_2 = 'TIER_2', 'Tier 2'
    TIER_3 = 'TIER_3', 'Tier 3'


class Ownership(models.TextChoices):
    GOVERNMENT      = 'GOVERNMENT',      'Government'
    PRIVATE         = 'PRIVATE',         'Private'
    SEMI_GOVERNMENT = 'SEMI_GOVERNMENT', 'Semi-Government'


class ProgramType(models.TextChoices):
    BTECH = 'BTECH', 'B.Tech'
    MTECH = 'MTECH', 'M.Tech'
    BBA   = 'BBA',   'BBA'
    MBA   = 'MBA',   'MBA'
    MBBS  = 'MBBS',  'MBBS'
    BA    = 'BA',    'BA'
    MA    = 'MA',    'MA'


class BookmarkCategory(models.TextChoices):
    DREAM  = 'Dream',  'Dream'
    TARGET = 'Target', 'Target'
    SAFETY = 'Safety', 'Safety'


# ---------------------------------------------------------------------------
# Custom User Manager
# ---------------------------------------------------------------------------

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        extra_fields.setdefault('role', Role.STUDENT)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('role', Role.ADMIN)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, name, password, **extra_fields)


# ---------------------------------------------------------------------------
# User  (replaces Prisma User model)
# ---------------------------------------------------------------------------

class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model — uses email as the unique identifier instead of username.
    """
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email      = models.EmailField(unique=True)
    name       = models.CharField(max_length=255)
    role       = models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)
    is_active  = models.BooleanField(default=True)
    is_staff   = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f'{self.name} <{self.email}>'


# ---------------------------------------------------------------------------
# Profile  (replaces Prisma Profile model)
# ---------------------------------------------------------------------------

class Profile(models.Model):
    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user          = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    target_stream = models.CharField(max_length=100, blank=True, null=True)
    target_year   = models.IntegerField(blank=True, null=True)
    city          = models.CharField(max_length=100, blank=True, null=True)
    state         = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'profiles'

    def __str__(self):
        return f'Profile of {self.user.name}'


# ---------------------------------------------------------------------------
# College  (replaces Prisma College model)
# ---------------------------------------------------------------------------

class College(models.Model):
    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name             = models.CharField(max_length=500)
    short_name       = models.CharField(max_length=50, blank=True, null=True)
    established_year = models.IntegerField(blank=True, null=True)
    city             = models.CharField(max_length=100)
    state            = models.CharField(max_length=100)
    tier             = models.CharField(max_length=10, choices=Tier.choices)
    ownership        = models.CharField(max_length=20, choices=Ownership.choices)
    campus_size      = models.CharField(max_length=100, blank=True, null=True)
    faculty_count    = models.IntegerField(blank=True, null=True)
    website          = models.URLField(blank=True, null=True)
    lat              = models.FloatField(blank=True, null=True)
    lng              = models.FloatField(blank=True, null=True)
    nirf_rank        = models.IntegerField(blank=True, null=True)
    avg_package_lpa  = models.FloatField(blank=True, null=True)
    annual_fee_lpa   = models.FloatField(blank=True, null=True)
    created_at       = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'colleges'
        indexes = [
            models.Index(fields=['city', 'state']),
            models.Index(fields=['tier']),
            models.Index(fields=['ownership']),
        ]

    def __str__(self):
        return self.name


# ---------------------------------------------------------------------------
# Program  (replaces Prisma Program model)
# ---------------------------------------------------------------------------

class Program(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    college    = models.ForeignKey(College, on_delete=models.CASCADE, related_name='programs')
    name       = models.CharField(max_length=255)
    type       = models.CharField(max_length=10, choices=ProgramType.choices)
    duration   = models.IntegerField(help_text='Duration in years')
    annual_fee = models.IntegerField(help_text='Annual fee in INR')
    intake     = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'programs'
        indexes = [models.Index(fields=['college'])]

    def __str__(self):
        return f'{self.name} — {self.college.short_name or self.college.name}'


# ---------------------------------------------------------------------------
# Placement  (replaces Prisma Placement model)
# ---------------------------------------------------------------------------

class Placement(models.Model):
    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    college          = models.ForeignKey(College, on_delete=models.CASCADE, related_name='placements')
    year             = models.IntegerField()
    avg_package_lpa  = models.FloatField()
    highest_package  = models.FloatField(blank=True, null=True)
    placement_rate   = models.FloatField(blank=True, null=True, help_text='Percentage')

    class Meta:
        db_table = 'placements'
        indexes = [models.Index(fields=['college', 'year'])]
        ordering = ['-year']

    def __str__(self):
        return f'{self.college.short_name or self.college.name} — {self.year}'


# ---------------------------------------------------------------------------
# Exam  (replaces Prisma Exam model)
# ---------------------------------------------------------------------------

class Exam(models.Model):
    id        = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name      = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=300, blank=True, null=True)
    level     = models.CharField(max_length=50, help_text='"National" or "State"')
    colleges  = models.ManyToManyField(College, through='CollegeExam', related_name='exams')

    class Meta:
        db_table = 'exams'

    def __str__(self):
        return self.name


# ---------------------------------------------------------------------------
# CollegeExam  (M2M through table, replaces Prisma CollegeExam model)
# ---------------------------------------------------------------------------

class CollegeExam(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    exam    = models.ForeignKey(Exam, on_delete=models.CASCADE)

    class Meta:
        db_table = 'college_exams'
        unique_together = [['college', 'exam']]


# ---------------------------------------------------------------------------
# Review  (replaces Prisma Review model)
# ---------------------------------------------------------------------------

class Review(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    college    = models.ForeignKey(College, on_delete=models.CASCADE, related_name='reviews')
    rating     = models.IntegerField()  # 1–5
    content    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reviews'
        indexes = [
            models.Index(fields=['college']),
            models.Index(fields=['user']),
        ]

    def __str__(self):
        return f'Review by {self.user.name} on {self.college.name} ({self.rating}★)'


# ---------------------------------------------------------------------------
# Bookmark  (replaces Prisma Bookmark model)
# ---------------------------------------------------------------------------

class Bookmark(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    college    = models.ForeignKey(College, on_delete=models.CASCADE, related_name='bookmarks')
    category   = models.CharField(
        max_length=10,
        choices=BookmarkCategory.choices,
        default=BookmarkCategory.TARGET,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bookmarks'
        unique_together = [['user', 'college']]

    def __str__(self):
        return f'{self.user.name} → {self.college.name} ({self.category})'


# ---------------------------------------------------------------------------
# Facility  (replaces Prisma Facility model)
# ---------------------------------------------------------------------------

class Facility(models.Model):
    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    college      = models.ForeignKey(College, on_delete=models.CASCADE, related_name='facilities')
    name         = models.CharField(max_length=200)
    has_facility = models.BooleanField(default=True)
    details      = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'facilities'
        indexes = [models.Index(fields=['college'])]

    def __str__(self):
        status = '✓' if self.has_facility else '✗'
        return f'{status} {self.name} — {self.college.name}'
