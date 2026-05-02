from django.db import models
from accounts.models import User


# =========================
# CATEGORY MODEL
# =========================
class Category(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


# =========================
# COURSE MODEL
# =========================
class Course(models.Model):

    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()

    instructor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="courses"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# =========================
# ENROLLMENT MODEL
# =========================
class Enrollment(models.Model):

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )

    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'course')  # 👈 duplicate enrollment stop

    def __str__(self):
        return f"{self.student.username} -> {self.course.title}"