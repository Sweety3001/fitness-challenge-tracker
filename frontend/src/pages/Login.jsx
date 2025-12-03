import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60"></div>

      {/* Container */}
      <div
        className={`relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-purple-400 outline-none"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-purple-400 outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_3px_rgba(216,115,255,0.4)] transition-all hover:scale-[1.03]"
          >
            Login
          </button>

          <p className="text-center text-gray-300 mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pink-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
