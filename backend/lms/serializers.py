from rest_framework import serializers
from .models import Course, Category, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    instructor = serializers.ReadOnlyField(source='instructor.username')

    class Meta:
        model = Course
        fields = '__all__'

"""
class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.ReadOnlyField(source='student.username')
    class Meta:
        model = Enrollment
        fields = '__all__'

"""


class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.ReadOnlyField(source='student.username')
    course_detail = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = '__all__'

    def get_course_detail(self, obj):
        return {
            "id": obj.course.id,
            "title": obj.course.title,
            "description": obj.course.description
        }