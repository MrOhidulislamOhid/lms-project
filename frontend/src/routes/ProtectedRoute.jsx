import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // decode token
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userRole = payload.role;

  // role check
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;