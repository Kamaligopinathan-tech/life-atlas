from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg, Count, Q
from decimal import Decimal
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = Student.objects.all()

        # Search parameter across multiple fields
        search = self.request.query_params.get('search', None)
        if search:
            search = search.strip()
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(student_id__icontains=search) |
                Q(email__icontains=search)
            )

        # Department filter
        department = self.request.query_params.get('department', None)
        if department and department != 'All':
            queryset = queryset.filter(department=department)

        # Status filter
        status_param = self.request.query_params.get('status', None)
        if status_param and status_param != 'All':
            queryset = queryset.filter(status=status_param)

        # Sorting
        ordering = self.request.query_params.get('ordering', '-created_at')
        allowed_orderings = [
            'created_at', '-created_at',
            'student_id', '-student_id',
            'first_name', '-first_name',
            'last_name', '-last_name',
            'gpa', '-gpa',
            'enrollment_date', '-enrollment_date',
        ]
        if ordering in allowed_orderings:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by('-created_at')

        return queryset

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        """
        Returns statistical summary for the dashboard metrics.
        """
        total_students = Student.objects.count()
        active_students = Student.objects.filter(status='Active').count()
        graduated_students = Student.objects.filter(status='Graduated').count()
        inactive_students = Student.objects.filter(status='Inactive').count()
        suspended_students = Student.objects.filter(status='Suspended').count()

        avg_gpa_val = Student.objects.aggregate(Avg('gpa'))['gpa__avg']
        avg_gpa = round(float(avg_gpa_val), 2) if avg_gpa_val is not None else 0.00

        dept_data = (
            Student.objects.values('department')
            .annotate(count=Count('id'))
            .order_by('-count')
        )

        return Response({
            'total_students': total_students,
            'active_students': active_students,
            'graduated_students': graduated_students,
            'inactive_students': inactive_students,
            'suspended_students': suspended_students,
            'average_gpa': avg_gpa,
            'department_distribution': list(dept_data),
        }, status=status.HTTP_200_OK)
