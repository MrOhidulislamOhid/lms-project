import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    API.get(`lms/courses/${id}/`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data);
        setLoading(false);
      });

    // Check if student is already enrolled
    if (role === "student") {
      API.get("lms/enrollments/my_courses/")
        .then((res) => {
          const isEnrolled = res.data.some((item) => item.course === parseInt(id));
          setEnrolled(isEnrolled);
        })
        .catch((err) => console.log(err));
    }
  }, [id, role]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await API.post("lms/enrollments/", { course: parseInt(id) });
      alert("Enrolled successfully!");
      setEnrolled(true);
    } catch (err) {
      console.log("ENROLLMENT ERROR:", err.response?.data);
      alert(err.response?.data?.detail || "Enrollment failed! You may already be enrolled.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Course not found</p>
          <Link
            to="/courses"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-block text-blue-100 hover:text-white mb-4 transition">
            ← Back to Courses
          </Link>
          <h1 className="text-4xl font-bold text-white">{course.title}</h1>
          <p className="text-blue-100 mt-2">Course Details</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
            <p className="text-gray-600 leading-relaxed">{course.description}</p>
          </div>

          {/* Instructor Info */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instructor</h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg inline-block">
              {course.instructor || "Not assigned"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {role === "student" && (
              <button
                onClick={handleEnroll}
                disabled={enrolling || enrolled}
                className={`font-semibold py-2 px-6 rounded-lg transition ${
                  enrolled
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                }`}
              >
                {enrolling ? "Enrolling..." : enrolled ? "Already Enrolled" : "Enroll Now"}
              </button>
            )}
            {(role === "instructor" || role === "admin") && (
              <Link to={`/edit-course/${course.id}`}>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                  Edit Course
                </button>
              </Link>
            )}
            <Link to="/courses">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;