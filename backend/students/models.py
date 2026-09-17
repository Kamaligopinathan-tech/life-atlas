from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from decimal import Decimal


class Student(models.Model):
    DEPARTMENT_CHOICES = [
        ('Computer Science', 'Computer Science'),
        ('Information Technology', 'Information Technology'),
        ('Electrical Engineering', 'Electrical Engineering'),
        ('Mechanical Engineering', 'Mechanical Engineering'),
        ('Business Administration', 'Business Administration'),
        ('Data Science', 'Data Science'),
    ]

    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Graduated', 'Graduated'),
        ('Suspended', 'Suspended'),
    ]

    student_id_validator = RegexValidator(
        regex=r'^[A-Z0-9\-]{4,20}$',
        message="Student ID must be 4-20 uppercase alphanumeric characters or hyphens (e.g., STU-2026-001)."
    )

    student_id = models.CharField(
        max_length=20,
        unique=True,
        validators=[student_id_validator],
        help_text="Unique student registration/roll code (e.g., STU-2026-001)"
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, help_text="Unique student email address")
    phone = models.CharField(max_length=20, help_text="Contact telephone number")
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    enrollment_date = models.DateField(help_text="Official date of enrollment")
    gpa = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[
            MinValueValidator(Decimal('0.00')),
            MaxValueValidator(Decimal('4.00'))
        ],
        help_text="Cumulative Grade Point Average between 0.00 and 4.00"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Active'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['student_id']),
            models.Index(fields=['email']),
            models.Index(fields=['department']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.student_id} - {self.first_name} {self.last_name} ({self.department})"
