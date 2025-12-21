import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ message, streak }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [showBadgeToast, setShowBadgeToast] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const popoverRef = useRef(null);
  const toastRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check for new badges on user load
  useEffect(() => {
    if (user && user.badges) {
      const seenBadges = JSON.parse(localStorage.getItem("seenBadges") || "[]");
      const userBadges = user.badges || [];
      
      // Find new badges
      const newBadges = userBadges.filter(badge => !seenBadges.includes(badge));
      
      if (newBadges.length > 0) {
        // Show toast for the first new badge
        setNewBadge(newBadges[0]);
        setShowBadgeToast(true);
        
        // Update seen badges in localStorage
        const updatedSeenBadges = [...seenBadges, ...newBadges];
        localStorage.setItem("seenBadges", JSON.stringify(updatedSeenBadges));
        
        // Auto dismiss toast after 3 seconds
        const timer = setTimeout(() => {
          setShowBadgeToast(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  // Close toast when clicking outside
  useEffect(() => {
    const handleClickOutsideToast = (event) => {
      if (toastRef.current && !toastRef.current.contains(event.target)) {
        setShowBadgeToast(false);
      }
    };

    if (showBadgeToast) {
      document.addEventListener("mousedown", handleClickOutsideToast);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideToast);
    };
  }, [showBadgeToast]);

  // Calculate XP progress
  const XP_PER_LEVEL = 500;
  const currentXP = user?.xp ?? 0;
  const currentLevel = user?.level ?? 1;
  const nextLevelXP = currentLevel * XP_PER_LEVEL;
  const xpProgress = Math.min((currentXP / nextLevelXP) * 100, 100);

  // All possible badges
  const ALL_BADGES = [
    {
      id: "first_challenge",
      title: "First Challenge",
      icon: "🎯",
      description: "Join your first challenge"
    },
    {
      id: "steps_10k",
      title: "10K Steps Day",
      icon: "👟",
      description: "Walk 10,000 steps in a single day"
    },
    {
      id: "streak_7",
      title: "7-Day Streak",
      icon: "🔥",
      description: "Stay active for 7 days straight"
    },
    {
      id: "streak_30",
      title: "30-Day Streak",
      icon: "🏆",
      description: "Maintain activity for 30 days straight"
    },
    {
      id: "marathon_runner",
      title: "Marathon Runner",
      icon: "🏃",
      description: "Reach 10,000 steps in a day"
    },
    {
      id: "early_bird",
      title: "Early Bird",
      icon: "🌅",
      description: "Log activity before 8 AM"
    },
    {
      id: "night_owl",
      title: "Night Owl",
      icon: "🌙",
      description: "Log activity after 10 PM"
    },
    {
      id: "calorie_crusher",
      title: "Calorie Crusher",
      icon: "💪",
      description: "Burn 500 calories in a day"
    }
  ];

  // Check if user has earned a specific badge
  const hasBadge = (badgeId) => {
    return user?.badges?.includes(badgeId) || false;
  };

  const handleLogout = () => {
    logout();
    setOpenProfile(false);
  };

  const handleEditProfile = () => {
    navigate("/profile");
    setOpenProfile(false);
  };

  // Filter earned badges for avatar popup
  const earnedBadges = ALL_BADGES.filter(badge => hasBadge(badge.id));

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold">
            Hi {user?.name || "Athlete"} 👋
          </h1>
          <p className="mt-1 text-gray-400">{message}</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* STREAK */}
          <div className="bg-[#0b0b12] border border-white/10 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400">Streak</p>
            <p className="text-lg font-semibold">🔥 {streak} days</p>
          </div>

          {/* AVATAR WITH POPOVER */}
          <div className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="relative flex items-center justify-center w-12 h-12 transition border rounded-full cursor-pointer bg-white/10 border-white/20 hover:border-white/40"
            >
              <span className="text-sm font-semibold">
                {user?.name?.[0] || "U"}
              </span>
            </div>

            {/* POPOVER */}
            {openProfile && (
              <div 
                ref={popoverRef}
                className="absolute right-0 z-50 w-80 mt-2 bg-[#0b0b12] border border-white/10 rounded-xl shadow-lg"
              >
                {/* USER INFO */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center text-base font-bold rounded-full w-10 h-10 bg-violet-600">
                      {user?.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[160px]">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  
                  {/* XP + Level */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs">
                      <span className="text-gray-400">Level </span>
                      <span className="font-medium text-white">{currentLevel}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-400">XP </span>
                      <span className="font-medium text-white">{currentXP}/{nextLevelXP}</span>
                    </div>
                  </div>
                  <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                </div>

                {/* BADGES SECTION */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Achievements</h3>
                  {earnedBadges.length > 0 ? (
                    <div className="grid grid-cols-4 gap-3">
                      {earnedBadges.map((badge) => (
                        <div 
                          key={badge.id}
                          className="relative group"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <div className="
                              flex items-center justify-center w-12 h-12 rounded-full
                              bg-violet-600/20 text-violet-400 glow
                            ">
                              <span className="text-lg">{badge.icon}</span>
                            </div>
                          </div>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            <div className="font-medium">{badge.title}</div>
                          </div>
                          <div className="mt-1 text-xs text-center text-gray-400 truncate w-full">
                            {badge.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">No achievements yet</p>
                    </div>
                  )}
                  
                  {/* VIEW ALL ACHIEVEMENTS BUTTON */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <button 
                      className="w-full text-xs text-violet-400 hover:text-violet-300 text-center"
                      onClick={() => {
                        // Future implementation for viewing all achievements
                        console.log("View all achievements clicked");
                      }}
                    >
                      View all achievements →
                    </button>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="p-4 pt-0 space-y-2">
                  <button 
                    onClick={handleEditProfile}
                    className="w-full px-3 py-2 text-sm text-white transition rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-sm text-red-400 transition border rounded-lg border-red-400/30 hover:bg-red-400/10"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BADGE TOAST */}
      {showBadgeToast && (
        <div 
          ref={toastRef}
          className="fixed bottom-4 right-4 z-50 bg-[#0b0b12] border border-white/10 rounded-lg shadow-lg p-4 w-64 animate-fadeInUp"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 text-violet-400">
                🏆
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">New Badge Unlocked!</p>
              <p className="text-sm text-gray-300">{newBadge}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;