import React from "react";

const Mascot = ({ className = "w-48 h-48" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Cute mascot SVG - simple, scalable */}
      <svg viewBox="0 0 240 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#FFB6C1" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
        </defs>

        {/* Body */}
        <g className="transform-gpu animate-bounce-slow" style={{ transformOrigin: "120px 140px" }}>
          <ellipse cx="120" cy="140" rx="70" ry="50" fill="url(#g1)" />
          {/* Head */}
          <circle cx="120" cy="80" r="48" fill="#ffffff"/>
          <circle cx="120" cy="80" r="44" fill="#FFD6E0" />
          {/* Eyes */}
          <circle cx="104" cy="74" r="5" fill="#2b2b2b" />
          <circle cx="136" cy="74" r="5" fill="#2b2b2b" />
          {/* Smile */}
          <path d="M105 92 Q120 105 135 92" stroke="#2b2b2b" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Headband */}
          <rect x="70" y="58" width="100" height="10" rx="5" fill="#60A5FA" />
          <rect x="66" y="64" width="30" height="6" rx="3" fill="#3B82F6" transform="rotate(-15 81 67)" />
          {/* Arm weights */}
          <rect x="38" y="125" width="18" height="8" rx="4" fill="#94A3B8" transform="rotate(-12 47 129)"/>
          <rect x="184" y="125" width="18" height="8" rx="4" fill="#94A3B8" transform="rotate(12 193 129)"/>

          {/* Small heart */}
          <path d="M120 40 c-6 -6 -16 -6 -22 0 c-6 6 -6 16 0 22 l22 22 l22 -22 c6 -6 6 -16 0 -22 c-6 -6 -16 -6 -22 0 z" fill="#FB7185" opacity="0.95" transform="translate(-10,-10) scale(0.25)"/>
        </g>
        <style>{`
          .animate-bounce-slow {
            animation: bob 2.6s ease-in-out infinite;
          }
          @keyframes bob {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default Mascot;
