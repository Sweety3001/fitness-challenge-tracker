import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import AuthLayout from "../layouts/AuthLayout";
import AnimatedPage from "../components/AnimatedPage";
import { useAuth } from "../context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };
//   if (!form.fullName || !form.email || !form.password) {
//   setError("All fields are required");
//   setLoading(false);
//   return;
// }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
    setError("All fields are required");
    return;
  }
    setLoading(true);
    
    try {
      // Map fullName to name for the backend
      const signupData = {
        name: form.fullName,
        email: form.email,
        password: form.password
      };
      
      const res = await api.signup(signupData);
      if (res?.accessToken) {
        // Log the user in automatically after signup
        localStorage.setItem("accessToken", res.accessToken);
        login(res.accessToken);
        // Check if profile is completed, if not redirect to profile setup
        if (!res.user.profileCompleted) {
          navigate("/profile-setup");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(res?.message || "Signup failed");
      }
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
    <AuthLayout
  title="Create account"
  subtitle="Start your fitness journey today."
  variant="signup"
>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={form.fullName}
          placeholder="Full name"
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        {/* <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
        /> */}
     <div className="relative">
  <input
    name="password"
    value={form.password}
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    onChange={handleChange}
    className="w-full px-4 py-2.5 pr-12 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-white"
  >
    {showPassword ? (
      <EyeSlashIcon className="w-5 h-5" />
    ) : (
      <EyeIcon className="w-5 h-5" />
    )}
  </button>
</div>


        <button 
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

     <button
  type="button"
  onClick={() => {
    window.location.href = "http://localhost:5000/api/auth/google/signup";
  }}
  className="mt-6 w-full py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
>
  Sign up with Google
</button>
      <p className="mt-6 text-sm text-center text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-violet-400 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
    </AnimatedPage>
  );
};

export default Signup;