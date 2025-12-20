import { useAuth } from "../../context/AuthContext";

const ProfileDrawer = ({ open, onClose }) => {
  const { user, logout } = useAuth();

  if (!open) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-[#0b0b12] border-l border-white/10 p-6 flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center text-lg font-bold rounded-full w-14 h-14 bg-violet-600">
            {user?.name?.[0] || "U"}
          </div>

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 border rounded-lg border-white/10">
            <p className="text-xs text-gray-400">Streak</p>
            <p className="text-lg font-semibold">🔥 {user?.streak ?? 0}</p>
          </div>

          <div className="p-4 border rounded-lg border-white/10">
            <p className="text-xs text-gray-400">Level</p>
            <p className="text-lg font-semibold">
              {user?.level ?? 1}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto space-y-3">
          <button className="w-full px-4 py-2 transition rounded-lg bg-white/10 hover:bg-white/20">
            Edit Profile
          </button>

          <button
            onClick={logout}
            className="w-full px-4 py-2 text-red-400 transition border rounded-lg border-red-400/30 hover:bg-red-400/10"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
