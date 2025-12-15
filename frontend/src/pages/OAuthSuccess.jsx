import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    navigate("/login");
    return;
  }

  localStorage.setItem("accessToken", token);

  // Let AuthContext fetch profile
  setTimeout(() => {
    navigate("/dashboard");
  }, 100);
}, []);


  return null;
};

export default OAuthSuccess;
