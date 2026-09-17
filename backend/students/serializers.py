from rest_framework import serializers
from .models import Student
import re
from decimal import Decimal


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id',
            'student_id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'department',
            'enrollment_date',
            'gpa',
            'status',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_student_id(self, value):
        cleaned = value.strip().upper()
        if not cleaned:
            raise serializers.ValidationError("Student ID is required and cannot be empty.")
        if not re.match(r'^[A-Z0-9\-]{4,20}$', cleaned):
            raise serializers.ValidationError(
                "Student ID must contain 4-20 alphanumeric uppercase characters or hyphens (e.g. STU-2026-001)."
            )
        # Check uniqueness during create or update
        qs = Student.objects.filter(student_id__iexact=cleaned)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"Student ID '{cleaned}' is already registered.")
        return cleaned

    def validate_first_name(self, value):
        cleaned = value.strip()
        if not cleaned:
            raise serializers.ValidationError("First name is required and cannot be empty.")
        if len(cleaned) < 2:
            raise serializers.ValidationError("First name must be at least 2 characters.")
        return cleaned

    def validate_last_name(self, value):
        cleaned = value.strip()
        if not cleaned:
            raise serializers.ValidationError("Last name is required and cannot be empty.")
        if len(cleaned) < 2:
            raise serializers.ValidationError("Last name must be at least 2 characters.")
        return cleaned

    def validate_email(self, value):
        cleaned = value.strip().lower()
        if not cleaned:
            raise serializers.ValidationError("Email address is required.")
        qs = Student.objects.filter(email__iexact=cleaned)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError(f"The email address '{cleaned}' is already in use by another student.")
        return cleaned

    def validate_phone(self, value):
        cleaned = value.strip()
        if not cleaned:
            raise serializers.ValidationError("Phone number is required.")
        digits = re.sub(r'\D', '', cleaned)
        if len(digits) < 7 or len(digits) > 15:
            raise serializers.ValidationError("Phone number must contain between 7 and 15 digits.")
        return cleaned

    def validate_gpa(self, value):
        if value is None:
            raise serializers.ValidationError("GPA is required.")
        try:
            val = Decimal(str(value))
        except Exception:
            raise serializers.ValidationError("GPA must be a valid numeric value.")
        if val < Decimal('0.00') or val > Decimal('4.00'):
            raise serializers.ValidationError("GPA must be within the range 0.00 to 4.00.")
        return round(val, 2)
