import React from "react";

const AuthLayout = ({ title, subtitle, children, variant = "login" }) => {
  const isSignup = variant === "signup";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-4xl h-[460px] rounded-2xl overflow-hidden shadow-2xl flex bg-[#0b0b12]">

        {/* LEFT — ILLUSTRATION */}
        <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">

          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-black" />

          {/* Glow blobs */}
          <div
            className={`absolute w-64 h-64 bg-violet-600/30 rounded-full blur-3xl top-16 left-12
              ${isSignup ? "animate-ping opacity-20" : "animate-pulse"}
            `}
          />
          <div className="absolute w-72 h-72 bg-purple-700/20 rounded-full blur-3xl bottom-10 right-10" />

          {/* FITNESS SVG */}
          <svg
            className={`relative z-10 w-72 h-72 text-violet-300
              ${isSignup ? "animate-spin-slow" : "animate-float"}
            `}
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <circle cx="150" cy="70" r="20" stroke="currentColor" strokeWidth="3" />

            {/* Body */}
            <line x1="150" y1="90" x2="150" y2="170" stroke="currentColor" strokeWidth="4" />

            {/* Arms */}
            <line x1="150" y1="110" x2="110" y2="140" stroke="currentColor" strokeWidth="4" />
            <line x1="150" y1="110" x2="190" y2="140" stroke="currentColor" strokeWidth="4" />

            {/* Legs */}
            <line x1="150" y1="170" x2="120" y2="220" stroke="currentColor" strokeWidth="4" />
            <line x1="150" y1="170" x2="180" y2="220" stroke="currentColor" strokeWidth="4" />

            {/* Energy arcs */}
            <path
              d="M80 150 C40 100, 40 200, 80 170"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.6"
            />
            <path
              d="M220 150 C260 100, 260 200, 220 170"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Caption */}
            <text
              x="150"
              y="260"
              textAnchor="middle"
              className="fill-violet-200 text-sm tracking-widest"
            >
              MOVE • TRAIN • REPEAT
            </text>
          </svg>
        </div>

        {/* RIGHT — FORM */}
        <div className="w-full md:w-1/2 px-8 py-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          {subtitle && (
            <p className="text-gray-400 text-sm mb-5">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
