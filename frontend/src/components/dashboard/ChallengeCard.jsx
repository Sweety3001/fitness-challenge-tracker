const ChallengeCard = ({ title, type, progress, daysLeft }) => {
  return (
    <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-5 hover:border-violet-500/40 transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white">{title}</h3>
        <span className="px-2 py-1 text-xs rounded bg-violet-500/10 text-violet-400">
          {type}
        </span>
      </div>

      <div className="w-full h-2 mb-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>{progress}% completed</span>
        <span>{daysLeft} days left</span>
      </div>
    </div>
  );
};

export default ChallengeCard;
