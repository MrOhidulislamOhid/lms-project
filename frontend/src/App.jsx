import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import MyCourses from "./pages/MyCourses";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";

import CourseDetail from "./pages/CourseDetail";

import EditCourse from "./pages/EditCourse";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔥 Protected Student Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <ProtectedRoute role="student">
              <MyCourses />
            </ProtectedRoute>
          }
        />

        {/* 🔥 Protected Instructor Routes */}
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute role="instructor">
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        {/* 🔥 General Protected Courses */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        }
      />

      


      <Route path="/edit-course/:id" element={<EditCourse />} />

        {/* Default Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;