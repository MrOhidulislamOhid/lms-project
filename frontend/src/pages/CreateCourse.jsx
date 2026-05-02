import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Simple validation
    if (!data.title || !data.description) {
      setError("Title and Description are required!");
      return;
    }

    setLoading(true);
    console.log("Sending Data:", data);

    try {
      const res = await API.post("lms/courses/", data);

      console.log("SUCCESS:", res.data);
      alert("Course created successfully!");

      // ✅ Redirect to courses
      navigate("/courses");

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setError(err.response?.data?.detail || "Course creation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Create Course</h1>
          <p className="text-blue-100 mt-2">Add a new course to the LMS</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Title
              </label>
              <input
                type="text"
                value={data.title}
                placeholder="Enter course title"
                onChange={(e) =>
                  setData({ ...data, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Description
              </label>
              <textarea
                value={data.description}
                placeholder="Enter course description"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Course"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;