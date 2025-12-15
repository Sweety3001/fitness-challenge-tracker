import { useState } from "react";

const StepBasicInfo = ({ data, setData, onNext, onSkip }) => {
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!data.age || !data.gender) {
      setError("Please complete all fields");
      return;
    }
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto">

      {/* PROGRESS */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">Step 1 of 3</span>
        <div className="flex gap-1">
          <span className="w-6 h-1 rounded-full bg-violet-500" />
          <span className="w-6 h-1 rounded-full bg-gray-700" />
          <span className="w-6 h-1 rounded-full bg-gray-700" />
        </div>
      </div>

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-white mb-2">
        Tell us about yourself
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        This helps us personalize workouts and challenges for you.
      </p>

      {/* AGE */}
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">Your Age</label>
        <input
          type="number"
          placeholder="e.g. 21"
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-[#151522] text-white border border-gray-700 focus:ring-2 focus:ring-violet-500 outline-none"
        />
      </div>

      {/* GENDER */}
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-3">Gender</label>

        <div className="grid grid-cols-3 gap-3">
          {["male", "female", "other"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setData({ ...data, gender: g })}
              className={`py-3 rounded-xl border text-sm font-medium transition
                ${
                  data.gender === g
                    ? "border-violet-500 bg-violet-500/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }
              `}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {/* CONTINUE */}
      <button
        onClick={handleContinue}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
      >
        Continue →
      </button>
      <button
  type="button"
  onClick={onSkip}
  className="mt-4 text-sm text-gray-400 hover:text-white transition w-full text-center"
>
  Skip for now →
</button>

    </div>
  );
};

export default StepBasicInfo;
