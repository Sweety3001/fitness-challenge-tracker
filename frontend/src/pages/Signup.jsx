import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550345332-09e3acb4c97f?q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60"></div>

      {/* Signup Container */}
      <div
        className={`relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-5">

          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 outline-none"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 outline-none"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 outline-none"
              placeholder="Create password"
            />
          </div>

          {/* Signup Button */}
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_3px_rgba(255,120,200,0.4)] transition-all hover:scale-[1.03]"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-300 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
