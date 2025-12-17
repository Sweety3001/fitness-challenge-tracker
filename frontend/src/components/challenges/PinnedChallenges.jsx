const PinnedChallenges = ({ challenges, onAdd }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Challenges</h2>
        <button
          onClick={onAdd}
          className="px-4 py-1.5 rounded-full bg-violet-600/20 text-violet-400 hover:bg-violet-600/30 text-sm"
        >
          + Add Challenge
        </button>
      </div>

      {/* Empty State */}
      {challenges.length === 0 && (
        <div className="p-6 text-center text-gray-400 border border-dashed border-white/20 rounded-xl">
          <p>No challenges joined yet.</p>
          <p className="mt-1 text-sm">
            Add one to start tracking progress 🚀
          </p>
        </div>
      )}

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {challenges.map((c) => (
          <div
            key={c.id}
            className="bg-[#0b0b12] border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {c.description}
                </p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-violet-600/20 text-violet-300">
                {c.type}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-300">
              🎯 Goal: <span className="font-medium">{c.goal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedChallenges;
