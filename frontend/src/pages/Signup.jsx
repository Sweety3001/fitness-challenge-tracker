import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import AuthLayout from "../layouts/AuthLayout";
import AnimatedPage from "../components/AnimatedPage";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          placeholder="Full name"
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
        />

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