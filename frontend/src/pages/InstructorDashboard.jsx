import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await API.get("lms/courses/");
      setCourses(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await API.delete(`lms/courses/${id}/`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      alert("Course deleted successfully!");
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data);
      alert("Delete failed");
    }
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">👨‍🏫 Instructor Dashboard</h1>
            <p className="text-blue-100">Manage your courses</p>
          </div>
          <Link to="/create-course">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition">
              + Create Course
            </button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {courses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't created any courses yet</p>
            <Link to="/create-course">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                Create Your First Course
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-32"></div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {course.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Link to={`/edit-course/${course.id}`} className="flex-1">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;