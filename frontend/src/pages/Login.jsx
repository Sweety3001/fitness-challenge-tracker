import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import AuthLayout from "../layouts/AuthLayout";
import AnimatedPage from "../components/AnimatedPage";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.login(form);
    setLoading(false);

    if (res?.accessToken) {
      login(res.accessToken);
      navigate("/dashboard");

    } else {
      setError(res?.message || "Login failed");
    }
  };

  return (
    <AnimatedPage>
    <AuthLayout
  title="Log in"
  subtitle="Welcome back. Let’s continue."
  variant="login"
>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-violet-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition">
          Log In
        </button>
      </form>

      <button
  type="button"
  onClick={() => {
    window.location.href = "http://localhost:5000/api/auth/google/login";
  }}
  className="mt-6 w-full py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
>
  Continue with Google
</button>

      <p className="mt-6 text-sm text-center text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-violet-400 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
    </AnimatedPage>
  );
};

export default Login;
