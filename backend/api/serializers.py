"""
api/serializers.py

DRF ModelSerializers for all API models.
"""
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    User, Profile, College, Program, Placement,
    Review, Exam, Bookmark, Facility,
)


# ---------------------------------------------------------------------------
# Auth Serializers
# ---------------------------------------------------------------------------

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'password', 'role')
        read_only_fields = ('id',)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Profile.objects.create(user=user)  # auto-create profile
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email_or_username = attrs.get('email') or attrs.get('username')
        password = attrs.get('password')

        if email_or_username and password:
            from django.contrib.auth import get_user_model, authenticate
            User = get_user_model()
            
            user = authenticate(request=self.context.get('request'), username=email_or_username, password=password)
            if not user:
                try:
                    user_obj = User.objects.get(email__iexact=email_or_username)
                    if user_obj.check_password(password):
                        user = user_obj
                except User.DoesNotExist:
                    pass

            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')
                
                from .models import Profile
                Profile.objects.get_or_create(user=user)

                refresh = self.get_token(user)
                return {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': {
                        'id': str(user.id),
                        'email': user.email,
                        'name': user.name,
                        'role': user.role,
                    }
                }

        raise serializers.ValidationError('Invalid email or password. Please check your credentials.')

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['role'] = user.role
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'role', 'created_at')
        read_only_fields = ('id', 'created_at')


# ---------------------------------------------------------------------------
# Profile
# ---------------------------------------------------------------------------

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'target_stream', 'target_year', 'city', 'state')
        read_only_fields = ('id',)


class UserDetailSerializer(serializers.ModelSerializer):
    """Full user detail including nested profile."""
    profile = ProfileSerializer(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'role', 'created_at', 'profile')
        read_only_fields = ('id', 'email', 'created_at')

    def to_representation(self, instance):
        from .models import Profile
        if not hasattr(instance, 'profile') or instance.profile is None:
            Profile.objects.get_or_create(user=instance)
        return super().to_representation(instance)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        # Update user fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # Update profile fields
        if profile_data:
            from .models import Profile
            profile, _ = Profile.objects.get_or_create(user=instance)
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        return instance


# ---------------------------------------------------------------------------
# College (nested)
# ---------------------------------------------------------------------------

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'name', 'type', 'duration', 'annual_fee', 'intake')
        read_only_fields = ('id',)


class PlacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placement
        fields = ('id', 'year', 'avg_package_lpa', 'highest_package', 'placement_rate')
        read_only_fields = ('id',)


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ('id', 'name', 'has_facility', 'details')
        read_only_fields = ('id',)


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ('id', 'name', 'full_name', 'level')
        read_only_fields = ('id',)


class CollegeListSerializer(serializers.ModelSerializer):
    """Compact serializer for list views."""
    class Meta:
        model = College
        fields = (
            'id', 'name', 'short_name', 'city', 'state',
            'tier', 'ownership', 'avg_package_lpa', 'annual_fee_lpa',
            'nirf_rank', 'lat', 'lng',
        )


class CollegeDetailSerializer(serializers.ModelSerializer):
    """Full serializer with nested relations for detail views."""
    programs   = ProgramSerializer(many=True, read_only=True)
    placements = PlacementSerializer(many=True, read_only=True)
    facilities = FacilitySerializer(many=True, read_only=True)
    exams      = ExamSerializer(many=True, read_only=True)

    class Meta:
        model = College
        fields = (
            'id', 'name', 'short_name', 'established_year',
            'city', 'state', 'tier', 'ownership',
            'campus_size', 'faculty_count', 'website',
            'lat', 'lng', 'nirf_rank',
            'avg_package_lpa', 'annual_fee_lpa',
            'programs', 'placements', 'facilities', 'exams',
            'created_at', 'updated_at',
        )


# ---------------------------------------------------------------------------
# Review
# ---------------------------------------------------------------------------

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'user', 'user_name', 'college', 'rating', 'content', 'created_at')
        read_only_fields = ('id', 'created_at', 'user_name')

    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError('Rating must be between 1 and 5.')
        return value

    def validate_content(self, value):
        if len(value) < 10:
            raise serializers.ValidationError('Review must be at least 10 characters.')
        return value


# ---------------------------------------------------------------------------
# Bookmark
# ---------------------------------------------------------------------------

class BookmarkSerializer(serializers.ModelSerializer):
    college_detail = CollegeListSerializer(source='college', read_only=True)

    class Meta:
        model = Bookmark
        fields = ('id', 'user', 'college', 'college_detail', 'category', 'created_at')
        read_only_fields = ('id', 'created_at', 'user', 'college_detail')
