"""
api/admin.py

Django Admin configuration for Studzens.
All models are registered with rich list_display, search, and filters.
Visit /admin/ to manage colleges, users, reviews, exams, and more.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import (
    User, Profile, College, Program, Placement,
    Review, Exam, CollegeExam, Bookmark, Facility,
)

# ---------------------------------------------------------------------------
# Admin site branding
# ---------------------------------------------------------------------------
admin.site.site_header  = 'Studzens Admin'
admin.site.site_title   = 'Studzens'
admin.site.index_title  = 'College Intelligence Dashboard'


# ---------------------------------------------------------------------------
# Inline admins (nested editing inside College admin)
# ---------------------------------------------------------------------------

class ProgramInline(admin.TabularInline):
    model  = Program
    extra  = 0
    fields = ('name', 'type', 'duration', 'annual_fee', 'intake')


class PlacementInline(admin.TabularInline):
    model  = Placement
    extra  = 0
    fields = ('year', 'avg_package_lpa', 'highest_package', 'placement_rate')
    ordering = ('-year',)


class FacilityInline(admin.TabularInline):
    model  = Facility
    extra  = 0
    fields = ('name', 'has_facility', 'details')


class ReviewInline(admin.TabularInline):
    model        = Review
    extra        = 0
    fields       = ('user', 'rating', 'content', 'created_at')
    readonly_fields = ('created_at',)
    show_change_link = True


# ---------------------------------------------------------------------------
# User Admin
# ---------------------------------------------------------------------------

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display   = ('email', 'name', 'role', 'is_staff', 'is_active', 'created_at')
    list_filter    = ('role', 'is_staff', 'is_active')
    search_fields  = ('email', 'name')
    ordering       = ('-created_at',)

    fieldsets = (
        (None,            {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name',)}),
        ('Permissions',   {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Timestamps',    {'fields': ('created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'role', 'password1', 'password2'),
        }),
    )
    readonly_fields  = ('created_at', 'updated_at')
    filter_horizontal = ('groups', 'user_permissions')


# ---------------------------------------------------------------------------
# College Admin
# ---------------------------------------------------------------------------

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display  = ('name', 'short_name', 'city', 'state', 'tier', 'ownership', 'nirf_rank', 'avg_package_lpa')
    list_filter   = ('tier', 'ownership', 'state')
    search_fields = ('name', 'short_name', 'city', 'state')
    ordering      = ('name',)
    inlines       = [ProgramInline, PlacementInline, FacilityInline, ReviewInline]

    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'short_name', 'established_year', 'website'),
        }),
        ('Location', {
            'fields': ('city', 'state', 'lat', 'lng'),
        }),
        ('Classification', {
            'fields': ('tier', 'ownership', 'nirf_rank'),
        }),
        ('Metrics', {
            'fields': ('avg_package_lpa', 'annual_fee_lpa', 'campus_size', 'faculty_count'),
        }),
    )


# ---------------------------------------------------------------------------
# Exam Admin
# ---------------------------------------------------------------------------

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display  = ('name', 'full_name', 'level')
    list_filter   = ('level',)
    search_fields = ('name', 'full_name')
    ordering      = ('name',)


# ---------------------------------------------------------------------------
# Review Admin
# ---------------------------------------------------------------------------

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display   = ('college', 'user', 'rating', 'created_at')
    list_filter    = ('rating', 'created_at')
    search_fields  = ('college__name', 'user__name', 'content')
    ordering       = ('-created_at',)
    readonly_fields = ('created_at',)
    raw_id_fields  = ('user', 'college')


# ---------------------------------------------------------------------------
# Bookmark Admin
# ---------------------------------------------------------------------------

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display  = ('user', 'college', 'category', 'created_at')
    list_filter   = ('category',)
    search_fields = ('user__name', 'college__name')
    ordering      = ('-created_at',)
    raw_id_fields = ('user', 'college')


# ---------------------------------------------------------------------------
# Simple registrations
# ---------------------------------------------------------------------------

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display  = ('user', 'target_stream', 'state', 'target_year')
    search_fields = ('user__name', 'user__email', 'state')


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display  = ('college', 'name', 'has_facility')
    list_filter   = ('has_facility',)
    search_fields = ('college__name', 'name')


@admin.register(Placement)
class PlacementAdmin(admin.ModelAdmin):
    list_display  = ('college', 'year', 'avg_package_lpa', 'highest_package', 'placement_rate')
    list_filter   = ('year',)
    search_fields = ('college__name',)
    ordering      = ('-year',)
