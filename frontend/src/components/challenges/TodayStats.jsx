const stats = [
  {
    title: "Steps",
    value: "6,420",
    unit: "",
    gradient: "from-cyan-500 to-blue-500",
    icon: "👟",
  },
  {
    title: "Calories",
    value: "520",
    unit: "kcal",
    gradient: "from-orange-500 to-red-500",
    icon: "🔥",
  },
  {
    title: "Workout Time",
    value: "42",
    unit: "min",
    gradient: "from-green-500 to-emerald-500",
    icon: "⏱️",
  },
  {
    title: "Streak",
    value: "7",
    unit: "days",
    gradient: "from-purple-500 to-pink-500",
    icon: "⚡",
  },
];

const TodayStats = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Today’s Snapshot</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-[#0b0b12] border border-white/10 rounded-xl p-5 hover:border-white/20 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{stat.title}</p>
              <span className="text-xl">{stat.icon}</span>
            </div>

            <div className="mt-4">
              <h3 className="text-3xl font-bold">
                {stat.value}
                <span className="ml-1 text-sm text-gray-400">
                  {stat.unit}
                </span>
              </h3>

              {/* Progress bar */}
              <div className="h-2 mt-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full bg-gradient-to-r ${stat.gradient}`}
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayStats;
