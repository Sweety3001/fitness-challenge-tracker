import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading, isProfileComplete } = useAuth();

  if (loading) return null;

  // ✅ If user is logged in, block public pages
  if (user) {
    if (!isProfileComplete) {
      return <Navigate to="/profile-setup" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ If NOT logged in, allow access to login/signup
  return children;
};

export default PublicRoute;
