from django.core.management.base import BaseCommand
from students.models import Student
from decimal import Decimal


class Command(BaseCommand):
    help = 'Seeds initial sample student records for demonstration and testing'

    def handle(self, *args, **kwargs):
        sample_students = [
            {
                "student_id": "STU-2024-001",
                "first_name": "Aarav",
                "last_name": "Sharma",
                "email": "aarav.sharma@university.edu",
                "phone": "+1-555-0101",
                "department": "Computer Science",
                "enrollment_date": "2024-08-15",
                "gpa": Decimal("3.88"),
                "status": "Active"
            },
            {
                "student_id": "STU-2024-002",
                "first_name": "Elena",
                "last_name": "Rostova",
                "email": "elena.rostova@university.edu",
                "phone": "+1-555-0102",
                "department": "Data Science",
                "enrollment_date": "2024-08-15",
                "gpa": Decimal("3.95"),
                "status": "Active"
            },
            {
                "student_id": "STU-2023-015",
                "first_name": "Marcus",
                "last_name": "Chen",
                "email": "marcus.chen@university.edu",
                "phone": "+1-555-0103",
                "department": "Electrical Engineering",
                "enrollment_date": "2023-09-01",
                "gpa": Decimal("3.45"),
                "status": "Active"
            },
            {
                "student_id": "STU-2022-040",
                "first_name": "Sophia",
                "last_name": "Patel",
                "email": "sophia.patel@university.edu",
                "phone": "+1-555-0104",
                "department": "Business Administration",
                "enrollment_date": "2022-09-01",
                "gpa": Decimal("3.72"),
                "status": "Graduated"
            },
            {
                "student_id": "STU-2023-088",
                "first_name": "David",
                "last_name": "Kim",
                "email": "david.kim@university.edu",
                "phone": "+1-555-0105",
                "department": "Mechanical Engineering",
                "enrollment_date": "2023-09-01",
                "gpa": Decimal("3.10"),
                "status": "Active"
            },
            {
                "student_id": "STU-2024-099",
                "first_name": "Amira",
                "last_name": "Al-Mansoor",
                "email": "amira.mansoor@university.edu",
                "phone": "+1-555-0106",
                "department": "Information Technology",
                "enrollment_date": "2024-08-15",
                "gpa": Decimal("3.65"),
                "status": "Active"
            },
            {
                "student_id": "STU-2023-112",
                "first_name": "Liam",
                "last_name": "O'Connor",
                "email": "liam.oconnor@university.edu",
                "phone": "+1-555-0107",
                "department": "Computer Science",
                "enrollment_date": "2023-09-01",
                "gpa": Decimal("2.80"),
                "status": "Inactive"
            },
            {
                "student_id": "STU-2024-120",
                "first_name": "Zara",
                "last_name": "Nkosi",
                "email": "zara.nkosi@university.edu",
                "phone": "+1-555-0108",
                "department": "Data Science",
                "enrollment_date": "2024-08-15",
                "gpa": Decimal("3.92"),
                "status": "Active"
            }
        ]

        created_count = 0
        for s_data in sample_students:
            obj, created = Student.objects.get_or_create(
                student_id=s_data["student_id"],
                defaults=s_data
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Successfully seeded database: {created_count} new student records created.")
        )
