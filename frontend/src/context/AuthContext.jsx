import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.getProfile();
      setUser(res);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  // Enhanced logActivity that updates user badges
  const logActivity = async (data) => {
    const response = await api.logActivity(data);
    // Update user badges with permanent badges from response
    if (response.permanentBadges && user) {
      setUser({
        ...user,
        badges: response.permanentBadges
      });
    }
    return response;
  };

  // Enhanced logSteps that updates user badges
  const logSteps = async (data) => {
    const response = await api.logSteps(data);
    // Update user badges with permanent badges from response
    if (response.permanentBadges && user) {
      setUser({
        ...user,
        badges: response.permanentBadges
      });
    }
    return response;
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("accessToken", token);
    setLoading(true);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setLoading(false);
    window.location.href = "/";
  };

  const isProfileComplete =
    user && user.profileCompleted === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        logActivity,  // Expose enhanced logActivity
        logSteps,     // Expose enhanced logSteps
        isProfileComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);