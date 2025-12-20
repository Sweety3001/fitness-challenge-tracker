import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import ProfileDrawer from "../profile/ProfileDrawer";

const DashboardHeader = ({ message, streak, xp, level }) => {
  const { user } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold">
            Hi {user?.name || "Athlete"} 👋
          </h1>
          <p className="mt-1 text-gray-400">
            {message}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* STREAK */}
          <div className="bg-[#0b0b12] border border-white/10 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400">Streak</p>
            <p className="text-lg font-semibold">🔥 {streak} days</p>
          </div>

        
          {/* AVATAR (CLICKABLE) */}
          <div
            onClick={() => setOpenProfile(true)}
            className="flex items-center justify-center w-12 h-12 transition border rounded-full cursor-pointer bg-white/10 border-white/20 hover:border-white/40"
          >
            <span className="text-sm font-semibold">
              {user?.name?.[0] || "U"}
            </span>
          </div>
        </div>
      </div>

      {/* PROFILE DRAWER */}
      <ProfileDrawer
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />
    </>
  );
};

export default DashboardHeader;
