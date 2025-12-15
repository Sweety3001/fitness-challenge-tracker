import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import AuthLayout from "../layouts/AuthLayout";
import AnimatedPage from "../components/AnimatedPage";
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.signup(form);
    if (res?.accessToken) navigate("/login");
    else setError(res?.message || "Signup failed");
  };

  return (
    <AnimatedPage>
    <AuthLayout
  title="Create account"
  subtitle="Start your fitness journey today."
  variant="signup"
>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

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

        <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition">
          Sign Up
        </button>
      </form>

      <button
  onClick={() => {
    window.location.href = "http://localhost:5000/api/auth/google";
  }}
  className="mt-6 w-full py-2.5 rounded-lg bg-white text-black font-semibold"
>
  Continue with Google
</button>


      <p className="mt-6 text-sm text-gray-400 text-center">
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
