import { useState } from "react";

const GOALS = [
  {
    id: "lose-fat",
    title: "Lose Fat",
    desc: "Burn calories and reduce body fat",
    icon: "🔥",
  },
  {
    id: "build-muscle",
    title: "Build Muscle",
    desc: "Increase strength and muscle mass",
    icon: "💪",
  },
  {
    id: "stay-active",
    title: "Stay Active",
    desc: "Maintain a healthy active lifestyle",
    icon: "🏃",
  },
  {
    id: "improve-stamina",
    title: "Improve Stamina",
    desc: "Boost endurance and energy levels",
    icon: "⚡",
  },
  {
    id: "mental-wellness",
    title: "Mental Wellness",
    desc: "Yoga, meditation, and mindfulness",
    icon: "🧘",
  },
];

const StepGoals = ({ data, setData, onBack, onFinish, onSkip }) => {
  const [error, setError] = useState("");

  const toggleGoal = (goalId) => {
    const exists = data.goals.includes(goalId);
    const updatedGoals = exists
      ? data.goals.filter((g) => g !== goalId)
      : [...data.goals, goalId];

    setData({ ...data, goals: updatedGoals });
    setError("");
  };

  const handleFinish = () => {
    if (data.goals.length === 0) {
      setError("Select at least one goal");
      return;
    }
    onFinish();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* PROGRESS */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">Step 3 of 3</span>
        <div className="flex gap-1">
          <span className="w-6 h-1 rounded-full bg-violet-500" />
          <span className="w-6 h-1 rounded-full bg-violet-500" />
          <span className="w-6 h-1 rounded-full bg-violet-500" />
        </div>
      </div>

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-white mb-2">
        Your fitness goals
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Choose what you want to focus on. You can change this anytime.
      </p>

      {/* GOAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {GOALS.map((goal) => {
          const selected = data.goals.includes(goal.id);

          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={`w-full p-3 rounded-xl border text-left transition
                ${
                  selected
                    ? "border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                    : "border-gray-700 hover:border-gray-500"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">{goal.icon}</span>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {goal.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {goal.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
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
          onClick={handleFinish}
          className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          Finish & Go to Dashboard →
        </button>
      </div>

      {/* SKIP */}
      <button
        onClick={onFinish}
        className="mt-4 w-full text-sm text-gray-500 hover:text-gray-300 transition"
      >
        Skip for now
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

export default StepGoals;
