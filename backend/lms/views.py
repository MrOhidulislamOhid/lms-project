from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model

from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer

User = get_user_model()


# =========================
# COURSE VIEWSET
# =========================



class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "instructor":
            return Course.objects.filter(instructor=user)

        if user.role == "admin":
            return Course.objects.all()

        return Course.objects.filter(status="published")

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    def perform_update(self, serializer):
        course = self.get_object()

        if self.request.user.role != "admin" and course.instructor != self.request.user:
            raise PermissionDenied("Not allowed to edit this course")

        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user

        if user.role != "admin" and instance.instructor != user:
            raise PermissionDenied("Not allowed to delete this course")

        instance.delete()


# =========================
# ENROLLMENT VIEWSET
# =========================
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "student":
            return Enrollment.objects.filter(student=user)

        return Enrollment.objects.all()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

    @action(detail=False, methods=['get'])
    def my_courses(self, request):
        enrollments = Enrollment.objects.filter(student=request.user)
        serializer = self.get_serializer(enrollments, many=True)
        return Response(serializer.data)


# =========================
# INSTRUCTOR DASHBOARD
# =========================
class InstructorDashboardAPIView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user

        courses = Course.objects.filter(instructor=user)

        total_courses = courses.count()

        total_enrollments = Enrollment.objects.filter(
            course__in=courses
        ).count()

        return Response({
            "total_courses": total_courses,
            "total_enrollments": total_enrollments,
            "courses": list(courses.values("id", "title", "description"))
        })


# =========================
# ADMIN DASHBOARD
# =========================
class AdminDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role != "admin":
            return Response({"error": "Permission denied"}, status=403)

        return Response({
            "total_users": User.objects.count(),
            "total_students": User.objects.filter(role="student").count(),
            "total_instructors": User.objects.filter(role="instructor").count(),
            "total_courses": Course.objects.count(),
            "total_enrollments": Enrollment.objects.count(),
            "recent_courses": [
                {
                    "id": c.id,
                    "title": c.title,
                    "description": c.description
                }
                for c in Course.objects.all().order_by("-id")[:5]
            ]
        })