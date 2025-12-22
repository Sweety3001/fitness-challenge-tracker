import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileDrawer = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  // Calculate XP progress
  const XP_PER_LEVEL = 500;
  const currentXP = user?.xp ?? 0;
  const currentLevel = user?.level ?? 1;
  const nextLevelXP = currentLevel * XP_PER_LEVEL;
  const xpProgress = Math.min((currentXP / nextLevelXP) * 100, 100);

  const handleEditProfile = () => {
    navigate("/profile");
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 z-50 w-full max-w-xs h-full bg-[#0b0b12] border-l border-white/10 p-5 flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button
            onClick={onClose}
            className="text-lg text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center text-base font-bold rounded-full w-12 h-12 bg-violet-600">
            {user?.name?.[0] || "U"}
          </div>

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate max-w-[120px]">
              {user?.email}
            </p>
          </div>
        </div>

        {/* LEVEL & XP */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-400">Level {currentLevel}</span>
            <span className="text-gray-400">{currentXP}/{nextLevelXP} XP</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* BADGES */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-2">Badges</p>
          <div className="flex flex-wrap gap-2">
            {user?.badges && user.badges.length > 0 ? (
              user.badges.map((badgeKey, i) => (
                <div 
                  key={i}
                  className="relative group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 text-sm">
                    🏅
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {badgeKey}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">No badges yet</p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto space-y-3">
          <button 
            onClick={handleEditProfile}
            className="w-full px-4 py-2 text-sm transition rounded-lg bg-white/10 hover:bg-white/20"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-red-400 transition border rounded-lg border-red-400/30 hover:bg-red-400/10"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;