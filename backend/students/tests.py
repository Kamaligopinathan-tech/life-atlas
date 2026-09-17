from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Student
from decimal import Decimal


class StudentAPITests(APITestCase):
    def setUp(self):
        self.valid_student_data = {
            "student_id": "STU-2026-001",
            "first_name": "Alice",
            "last_name": "Johnson",
            "email": "alice.johnson@university.edu",
            "phone": "+1-555-0199",
            "department": "Computer Science",
            "enrollment_date": "2024-09-01",
            "gpa": "3.85",
            "status": "Active"
        }

    # --- 1. CREATE TESTS ---
    def test_create_student_success(self):
        """Test creating a student with complete and valid data."""
        response = self.client.post('/api/students/', self.valid_student_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Student.objects.count(), 1)
        student = Student.objects.first()
        self.assertEqual(student.student_id, "STU-2026-001")
        self.assertEqual(student.first_name, "Alice")
        self.assertEqual(student.gpa, Decimal('3.85'))

    def test_create_student_missing_required_fields(self):
        """Test that missing mandatory fields return 400 Bad Request."""
        incomplete_data = {
            "first_name": "Incomplete"
        }
        response = self.client.post('/api/students/', incomplete_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('student_id', response.data)
        self.assertIn('last_name', response.data)
        self.assertIn('email', response.data)
        self.assertIn('department', response.data)

    def test_create_student_duplicate_student_id(self):
        """Test that duplicate student_id is rejected."""
        self.client.post('/api/students/', self.valid_student_data, format='json')
        
        duplicate_data = self.valid_student_data.copy()
        duplicate_data["email"] = "unique.email@university.edu"
        response = self.client.post('/api/students/', duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('student_id', response.data)

    def test_create_student_duplicate_email(self):
        """Test that duplicate email is rejected."""
        self.client.post('/api/students/', self.valid_student_data, format='json')
        
        duplicate_data = self.valid_student_data.copy()
        duplicate_data["student_id"] = "STU-2026-002"
        response = self.client.post('/api/students/', duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_create_student_invalid_email_format(self):
        """Test that invalid email format is rejected."""
        data = self.valid_student_data.copy()
        data["email"] = "not-a-valid-email"
        response = self.client.post('/api/students/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_create_student_invalid_gpa_range(self):
        """Test that GPA below 0.00 or above 4.00 is rejected."""
        data_high = self.valid_student_data.copy()
        data_high["gpa"] = "4.50"
        response_high = self.client.post('/api/students/', data_high, format='json')
        self.assertEqual(response_high.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('gpa', response_high.data)

        data_low = self.valid_student_data.copy()
        data_low["gpa"] = "-0.50"
        response_low = self.client.post('/api/students/', data_low, format='json')
        self.assertEqual(response_low.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('gpa', response_low.data)

    # --- 2. READ TESTS ---
    def test_read_all_students_empty_database(self):
        """Test listing students when database is empty."""
        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_read_all_students_populated_database(self):
        """Test listing students when database contains records."""
        self.client.post('/api/students/', self.valid_student_data, format='json')
        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['student_id'], "STU-2026-001")

    def test_read_single_student_valid_id(self):
        """Test reading a single student by ID."""
        create_resp = self.client.post('/api/students/', self.valid_student_data, format='json')
        student_id = create_resp.data['id']
        response = self.client.get(f'/api/students/{student_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['student_id'], "STU-2026-001")

    def test_read_single_student_invalid_id(self):
        """Test reading non-existent student ID returns 404."""
        response = self.client.get('/api/students/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # --- 3. UPDATE TESTS ---
    def test_update_student_full_put(self):
        """Test full update (PUT) of a student record."""
        create_resp = self.client.post('/api/students/', self.valid_student_data, format='json')
        student_id = create_resp.data['id']

        updated_data = self.valid_student_data.copy()
        updated_data["first_name"] = "Alicia"
        updated_data["gpa"] = "3.95"
        updated_data["department"] = "Data Science"

        response = self.client.put(f'/api/students/{student_id}/', updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], "Alicia")
        self.assertEqual(Decimal(str(response.data['gpa'])), Decimal('3.95'))
        self.assertEqual(response.data['department'], "Data Science")

        # Verify in DB
        student = Student.objects.get(pk=student_id)
        self.assertEqual(student.first_name, "Alicia")

    def test_update_student_partial_patch(self):
        """Test partial update (PATCH) of a student record."""
        create_resp = self.client.post('/api/students/', self.valid_student_data, format='json')
        student_id = create_resp.data['id']

        patch_data = {"status": "Graduated"}
        response = self.client.patch(f'/api/students/{student_id}/', patch_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], "Graduated")

    def test_update_student_invalid_id(self):
        """Test updating a non-existent student returns 404."""
        response = self.client.put('/api/students/99999/', self.valid_student_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # --- 4. DELETE TESTS ---
    def test_delete_student_success(self):
        """Test deleting an existing student."""
        create_resp = self.client.post('/api/students/', self.valid_student_data, format='json')
        student_id = create_resp.data['id']

        response = self.client.delete(f'/api/students/{student_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Student.objects.count(), 0)

        # Confirm 404 on subsequent read
        read_resp = self.client.get(f'/api/students/{student_id}/')
        self.assertEqual(read_resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_student_invalid_id(self):
        """Test deleting non-existent student returns 404."""
        response = self.client.delete('/api/students/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # --- 5. SEARCH, FILTER & STATS TESTS ---
    def test_search_and_filter(self):
        """Test query parameters search and department filtering."""
        self.client.post('/api/students/', self.valid_student_data, format='json')

        student2 = {
            "student_id": "STU-2026-002",
            "first_name": "Bob",
            "last_name": "Smith",
            "email": "bob.smith@university.edu",
            "phone": "+1-555-0200",
            "department": "Mechanical Engineering",
            "enrollment_date": "2024-09-01",
            "gpa": "3.20",
            "status": "Active"
        }
        self.client.post('/api/students/', student2, format='json')

        # Search by name
        res_search = self.client.get('/api/students/?search=Alice')
        self.assertEqual(len(res_search.data), 1)
        self.assertEqual(res_search.data[0]['first_name'], "Alice")

        # Filter by department
        res_dept = self.client.get('/api/students/?department=Mechanical Engineering')
        self.assertEqual(len(res_dept.data), 1)
        self.assertEqual(res_dept.data[0]['first_name'], "Bob")

    def test_stats_endpoint(self):
        """Test the statistics aggregation endpoint."""
        self.client.post('/api/students/', self.valid_student_data, format='json')
        response = self.client.get('/api/students/stats/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_students'], 1)
        self.assertEqual(response.data['active_students'], 1)
        self.assertEqual(response.data['average_gpa'], 3.85)
