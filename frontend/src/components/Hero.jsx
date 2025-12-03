import React, { useEffect, useState } from "react";

const Hero = () => {
  const [show, setShow] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    calories: 0,
    streak: 0,
  });

  useEffect(() => {
    setTimeout(() => setShow(true), 10);

    const calorieTarget = 532;
    const streakTarget = 7;

    let calorieCount = 0;
    let streakCount = 0;

    const interval = setInterval(() => {
      if (calorieCount < calorieTarget) {
        calorieCount += 10;
        if (calorieCount > calorieTarget) calorieCount = calorieTarget;
      }

      if (streakCount < streakTarget) {
        streakCount += 1;
      }

      setAnimatedNumbers({ calories: calorieCount, streak: streakCount });

      if (calorieCount === calorieTarget && streakCount === streakTarget) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-20 pb-10 px-6 md:px-20 overflow-hidden min-h-[90vh] flex items-center">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&h=1080&fit=crop"
          alt="Fitness Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto relative z-10">

        {/* LEFT CONTENT */}
        <div
          className={`md:w-1/2 transition-all duration-700 ease-out ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-purple-300 font-semibold text-sm tracking-widest uppercase bg-purple-900/30 backdrop-blur-sm px-3 py-1 rounded-full mb-4 border border-purple-500/30">
            Transform Your Fitness Journey
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-3 text-white">
            <span className="block">Elevate Your</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 py-2">
              Fitness Potential
            </span>
          </h1>

          <p className="text-gray-200 mt-4 text-lg max-w-lg">
            Track detailed progress, join community challenges, earn exclusive rewards, and stay
            accountable with beautifully designed analytics — all in one powerful platform.
          </p>

          {/* BUTTONS WITH SUBTLE GLOW + PERFECT BALANCE */}
          <div className="mt-8 flex gap-4 flex-nowrap max-sm:flex-wrap">

            {/* Glow Button 1 */}
            <a
              href="/register"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg 
              text-white font-semibold hover:scale-[1.04] transition-all duration-300 
              hover:shadow-[0_0_20px_3px_rgba(216,115,255,0.5)] 
              flex items-center gap-2 group whitespace-nowrap"
            >
              <span>Start Your Journey</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>

            {/* Glow Button 2 */}
            <a
              href="#features"
              className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold 
              hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_3px_rgba(255,255,255,0.2)] 
              flex items-center gap-2 group backdrop-blur-sm whitespace-nowrap"
            >
              <span>Explore Features</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div
          className={`md:w-2/5 transition-all duration-700 delay-100 ease-out ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4">

            {/* CALORIES CARD */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-400/10 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300 uppercase tracking-wider font-medium">Calories Burned</p>
                    <h4 className="font-bold text-white text-xl mt-1">
                      {animatedNumbers.calories}
                      <span className="text-sm text-gray-300 ml-1">kcal</span>
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Today</p>
              </div>

              <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-orange-400 h-2 rounded-full"
                  style={{ width: `${(animatedNumbers.calories / 600) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* STREAK CARD */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wider font-medium">Weekly Streak</p>
                  <h4 className="font-bold text-white text-xl">
                    {animatedNumbers.streak} <span className="text-gray-400 font-normal">days</span>
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < animatedNumbers.streak
                          ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                          : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-xs text-gray-400">
                {animatedNumbers.streak === 7 ? (
                  <p className="text-green-400 font-medium">🎉 Weekly goal achieved!</p>
                ) : (
                  <p>{7 - animatedNumbers.streak} days left to complete your streak</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
