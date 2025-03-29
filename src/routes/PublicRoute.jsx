import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (isAuthenticated) {
    toast.error("You are already logged in!", {
      icon: <FaExclamationTriangle style={{ color: "orange" }} />,
    });
    return <Navigate to="/" />;
  }

  return children;
}

export default PublicRoute;
