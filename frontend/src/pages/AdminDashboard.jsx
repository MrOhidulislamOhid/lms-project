import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("lms/admin-dashboard/")
      .then((res) => {
        setData(res.data);
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
          <p className="text-gray-600 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Failed to load dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">👑 Admin Dashboard</h1>
          <p className="text-blue-100">System Overview & Management</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{data.total_users}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">Students</p>
            <p className="text-3xl font-bold text-green-600">{data.total_students}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">Instructors</p>
            <p className="text-3xl font-bold text-purple-600">{data.total_instructors}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">Courses</p>
            <p className="text-3xl font-bold text-orange-600">{data.total_courses}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-600">
            <p className="text-gray-600 text-sm font-semibold mb-2">Enrollments</p>
            <p className="text-3xl font-bold text-pink-600">{data.total_enrollments}</p>
          </div>
        </div>

        {/* Recent Courses Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Courses</h2>

          {data.recent_courses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No courses yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.recent_courses.map((course) => (
                <Link
                  to={`/courses/${course.id}`}
                  key={course.id}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-24"></div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition mb-2 line-clamp-2">
                        {course.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {course.description}
                      </p>
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

export default AdminDashboard;
