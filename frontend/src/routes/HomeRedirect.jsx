import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomeRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // ❌ Not logged in → landing page
  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  // ❌ Logged in but profile incomplete
  if (!user.profileCompleted) {
    return <Navigate to="/profile-setup" replace />;
  }

  // ✅ Logged in + profile complete
  return <Navigate to="/dashboard" replace />;
};

export default HomeRedirect;
