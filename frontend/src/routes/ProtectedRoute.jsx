import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireProfile = false }) => {
  const { user, loading } = useAuth();

  // ✅ show loader while auth is resolving
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  // ✅ not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ profile not completed → go to setup
  if (requireProfile && !user.profileCompleted) {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
};

export default ProtectedRoute;
