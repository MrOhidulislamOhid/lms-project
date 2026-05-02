import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("lms/enrollments/my_courses/")
      .then((res) => {
        setEnrollments(res.data);
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
          <h1 className="text-4xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-blue-100">Your enrolled courses</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {enrollments.length === 0 ? (
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
            {enrollments.map((item) => (
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

                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                      View Course →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;