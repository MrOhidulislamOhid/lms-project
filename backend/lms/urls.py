
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, EnrollmentViewSet, InstructorDashboardAPIView, AdminDashboardAPIView

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'instructor-dashboard', InstructorDashboardAPIView, basename="instructor-dashboard")

urlpatterns = [
    path('', include(router.urls)),
    path("admin-dashboard/", AdminDashboardAPIView.as_view()),
]