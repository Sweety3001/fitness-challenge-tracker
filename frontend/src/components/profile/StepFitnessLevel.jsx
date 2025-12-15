import { useState } from "react";

const levels = [
  {
    id: "beginner",
    title: "Beginner",
    desc: "Just starting out or getting back into fitness",
    icon: "🟢",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    desc: "Workout 3–4 times per week",
    icon: "🔵",
  },
  {
    id: "advanced",
    title: "Advanced",
    desc: "Train consistently and track performance",
    icon: "🟣",
  },
];

const StepFitnessLevel = ({ data, setData, onNext, onBack, onSkip }) => {
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!data.fitnessLevel) {
      setError("Please select your fitness level");
      return;
    }
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto">

      {/* PROGRESS */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">Step 2 of 3</span>
        <div className="flex gap-1">
          <span className="w-6 h-1 rounded-full bg-violet-500" />
          <span className="w-6 h-1 rounded-full bg-violet-500" />
          <span className="w-6 h-1 rounded-full bg-gray-700" />
        </div>
      </div>

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-white mb-2">
        Your fitness level
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        This helps us tailor challenges and goals to your ability.
      </p>

      {/* LEVEL CARDS */}
      <div className="space-y-4 mb-6">
        {levels.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() =>
              setData({ ...data, fitnessLevel: level.id })
            }
            className={`w-full p-4 rounded-xl border text-left transition
              ${
                data.fitnessLevel === level.id
                  ? "border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  : "border-gray-700 hover:border-gray-500"
              }
            `}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{level.icon}</span>
              <div>
                <h4 className="text-white font-semibold">
                  {level.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {level.desc}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="w-1/3 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition"
        >
          Back
        </button>

        <button
          onClick={handleContinue}
          className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
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
    </div>
  );
};

export default StepFitnessLevel;
