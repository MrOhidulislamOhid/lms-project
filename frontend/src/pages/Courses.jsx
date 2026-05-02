import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  // ✅ FIX: ROLE AS STATE (IMPORTANT)
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    console.log("ROLE FROM STORAGE:", savedRole);

    setRole(savedRole || "");
  }, []);

  // 📦 Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("lms/courses/");
      console.log("COURSES:", res.data);
      setCourses(res.data);
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 🗑️ Delete
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      await API.delete(`lms/courses/${id}/`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      alert("Course deleted successfully!");
    } catch (err) {
      console.log(err.response?.data);
      alert("Delete failed!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">All Courses</h1>
          <p className="text-blue-100">Explore our collection of courses</p>
          {role && (
            <div className="mt-4">
              <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                {role}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses available yet</p>
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
                  <Link to={`/courses/${course.id}`}>
                    <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition mb-2">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {course.description}
                  </p>

                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-sm mb-4"
                  >
                    View Details →
                  </Link>

                  {/* Action Buttons */}
                  {(role === "instructor" || role === "admin") && (
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
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;