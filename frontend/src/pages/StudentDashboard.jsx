import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("lms/enrollments/my_courses/")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎓 Student Dashboard</h1>
          <p className="text-blue-100">Your learning journey starts here</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Enrolled</p>
            <p className="text-4xl font-bold text-blue-600">{courses.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">In Progress</p>
            <p className="text-4xl font-bold text-green-600">0</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">Completed</p>
            <p className="text-4xl font-bold text-purple-600">0</p>
          </div>
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Courses</h2>

          {courses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">You haven't enrolled in any courses yet</p>
              <Link
                to="/courses"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((item) => (
                <Link
                  to={`/courses/${item.course_detail?.id}`}
                  key={item.id}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-24"></div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition mb-2 line-clamp-2">
                        {item.course_detail?.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {item.course_detail?.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-gray-600">Progress</span>
                          <span className="text-xs font-semibold text-gray-600">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Continue Learning →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;