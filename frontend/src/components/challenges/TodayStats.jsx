const TodayStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-6">
        <p className="text-gray-400">Loading today’s activity…</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const {
    steps = 0,
    calories = 0,
  } = stats;

  return (
    <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Today</h3>
        <span className="text-xs text-gray-500">
          Live snapshot
        </span>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-white">
            {steps.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">Steps</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-white">
            {calories.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">kcal</p>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="h-px my-4 bg-white/10" /> */}

      {/* Footer action */}
      {/* <div className="text-right">
        <button className="text-sm text-violet-400 hover:underline">
          View details →
        </button>
      </div> */}
    </div>
  );
};

export default TodayStats;
