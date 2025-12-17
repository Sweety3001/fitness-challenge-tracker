const ChallengeCard = ({ title, type, progress, daysLeft }) => {
  return (
    <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-5 hover:border-violet-500/40 transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="px-2 py-1 text-xs rounded-full bg-violet-600/20 text-violet-400">
          {type}
        </span>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-4 text-xs text-gray-400">
        <span>{daysLeft}</span>
        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
