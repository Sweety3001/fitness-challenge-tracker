import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireProfile = false }) => {
  const { user, loading, isProfileComplete } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireProfile && !isProfileComplete) {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
};

export default ProtectedRoute;
