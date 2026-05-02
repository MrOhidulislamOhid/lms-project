import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-white text-2xl font-bold">📚 LMS</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/courses"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Courses
            </Link>

            {role === "student" && (
              <Link
                to="/student-dashboard"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Dashboard
              </Link>
            )}

            {role === "instructor" && (
              <>
                <Link
                  to="/instructor-dashboard"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-course"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Create Course
                </Link>
              </>
            )}

            {role === "admin" && (
              <Link
                to="/admin-dashboard"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right side - Role & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-white text-sm font-semibold capitalize bg-blue-700 px-3 py-1 rounded-full">
              {role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:bg-blue-700 px-3 py-2 rounded-md"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-700 space-y-1 pb-3">
            <Link
              to="/courses"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
            >
              Courses
            </Link>
            {role === "student" && (
              <Link
                to="/student-dashboard"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
              >
                Dashboard
              </Link>
            )}
            {role === "instructor" && (
              <>
                <Link
                  to="/instructor-dashboard"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-course"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
                >
                  Create Course
                </Link>
              </>
            )}
            {role === "admin" && (
              <Link
                to="/admin-dashboard"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
              >
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
