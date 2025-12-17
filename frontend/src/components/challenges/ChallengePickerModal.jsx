const AVAILABLE_CHALLENGES = [
  { id: "steps", title: "10k Steps Daily", type: "Steps" },
  { id: "run", title: "5km Running", type: "Running" },
  { id: "yoga", title: "Morning Yoga", type: "Yoga" },
  { id: "strength", title: "Strength Training", type: "Workout" },
];

const ChallengePickerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#0b0b12] w-full max-w-lg rounded-xl p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Challenges</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {AVAILABLE_CHALLENGES.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-3 transition rounded-lg bg-white/5 hover:bg-white/10"
            >
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-xs text-gray-400">{c.type}</p>
              </div>
              <button className="px-3 py-1 text-sm rounded bg-violet-600 hover:bg-violet-700">
                Join
              </button>
            </div>
          ))}
        </div>

        <button className="w-full py-2 border rounded-lg border-white/20 hover:bg-white/10">
          + Create Custom Challenge
        </button>
      </div>
    </div>
  );
};

export default ChallengePickerModal;
