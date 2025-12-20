const XPCard = ({ xp, level }) => {
  // XP required per level
  const XP_PER_LEVEL = 1000;

  // XP earned in current level
  const currentXP = xp % XP_PER_LEVEL;

  // Progress percentage
  const progress = (currentXP / XP_PER_LEVEL) * 100;

  return (
    <div className="p-5 text-white bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl">
      <p className="text-sm opacity-80">Level</p>
      <h2 className="mb-2 text-3xl font-bold">{level}</h2>

      <div className="w-full h-2 rounded-full bg-white/20">
        <div
          className="h-2 transition-all bg-white rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs opacity-80">
  {currentXP === 0 && xp !== 0
    ? "🎉 Level up! Start earning XP for next level"
    : `${currentXP} / ${XP_PER_LEVEL} XP to next level`}
</p>

    </div>
  );
};

export default XPCard;
