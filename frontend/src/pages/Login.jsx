import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("auth/login/", data);

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data?.access;

      // ❌ যদি token না আসে → login fail
      if (!token) {
        setError("Login failed: no token");
        return;
      }

      // ✅ role (backend থাকলে নেবে, না থাকলে default)
      let role = res.data?.role;

      // 🔥 fallback (IMPORTANT)
      if (!role) {
        console.log("No role from backend, using fallback");

        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          role = payload?.role || "student";
        } catch {
          role = "student";
        }
      }

      // ✅ Save
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      console.log("FINAL ROLE:", role);

      // ✅ Redirect
      if (role === "instructor") {
        navigate("/instructor-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      setError(err.response?.data?.detail || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">📚 LMS</h1>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={data.username}
                onChange={(e) =>
                  setData({ ...data, username: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;