const ProgressCard = ({ level, xp }) => {
  const XP_PER_LEVEL = 1000;

  const currentXP = xp % XP_PER_LEVEL;
  const percent = Math.round((currentXP / XP_PER_LEVEL) * 100);
  const remainingXP = XP_PER_LEVEL - currentXP;

  return (
    <div className="p-6 text-white bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl">
      <h3 className="mb-2 text-lg font-semibold">
        Level {level}
      </h3>

      {/* Progress bar */}
      <div className="h-3 mb-3 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-3 bg-white rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm text-white/90">
        {remainingXP} XP to next level
      </p>
    </div>
  );
};

export default ProgressCard;
