import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    API.get(`lms/courses/${id}/`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load course");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setUpdating(true);

    try {
      await API.put(`lms/courses/${id}/`, data);
      alert("Course updated successfully!");
      navigate("/instructor-dashboard");
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.detail || "Update failed!");
    } finally {
      setUpdating(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Edit Course</h1>
          <p className="text-blue-100 mt-2">Update your course information</p>
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

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Title
              </label>
              <input
                type="text"
                value={data.title}
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
                disabled={updating}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Update Course"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/instructor-dashboard")}
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

export default EditCourse;