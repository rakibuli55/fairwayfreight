import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;
