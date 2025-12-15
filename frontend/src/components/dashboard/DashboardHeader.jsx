import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      
      {/* LEFT — GREETING */}
      <div>
        <h1 className="text-3xl font-bold">
          Hi {user?.name || "Athlete"} 👋
        </h1>
        <p className="mt-1 text-gray-400">
          Let’s crush today’s goals 💪
        </p>
      </div>

      {/* RIGHT — STATS */}
      <div className="flex items-center gap-4">
        
        {/* STREAK */}
        <div className="bg-[#0b0b12] border border-white/10 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400">Streak</p>
          <p className="text-lg font-semibold">🔥 7 days</p>
        </div>

        {/* LEVEL */}
        <div className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl">
          <p className="text-xs opacity-90">Level</p>
          <p className="text-lg font-bold">3 · 420 XP</p>
        </div>

        {/* AVATAR */}
        <div className="flex items-center justify-center w-12 h-12 border rounded-full bg-white/10 border-white/20">
          <span className="text-sm font-semibold">
  {user?.name?.[0] || "U"}
</span>

        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
