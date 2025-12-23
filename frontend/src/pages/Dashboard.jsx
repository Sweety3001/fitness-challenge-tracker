import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import TodayStats from "../components/challenges/TodayStats";
import ActiveChallenges from "../components/challenges/ActiveChallenges";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";

import { api } from "../api/api";
import { getDailyMessage } from "../utils/getDailyMessage";

// Achievements Component
const Achievements = () => {
  const { user, dailyBadges } = useAuth();

  // All possible badges - using canonical badge keys
  const ALL_BADGES = [
    {
      id: "first_challenge",
      title: "First Challenge",
      icon: "🎯",
      description: "Join your first challenge"
    },
    {
      id: "steps_10k_day",
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
      id: "calorie_crusher",
      title: "Calorie Crusher",
      icon: "💪",
      description: "Burn 500 calories in a day"
    },
    {
      id: "marathon_runner",
      title: "Marathon Runner",
      icon: "🏃",
      description: "Complete any challenge"
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
    }
  ];

  // Check if user has earned a specific badge
  // const hasBadge = (badgeId) => {
  //   return user?.badges?.includes(badgeId) || false;
  // };
  const DAILY_BADGES = [
  "steps_10k_day",
  "calorie_crusher",
  "early_bird",
  "night_owl"
];

const hasBadge = (badgeId) => {
  if (DAILY_BADGES.includes(badgeId)) {
    return dailyBadges?.includes(badgeId);
  }
  return user?.badges?.includes(badgeId);
};



return (
  <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-6">


      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <span className="text-xs text-gray-400">
          {/* {user?.badges?.length || 0} / {ALL_BADGES.length} unlocked */}
          {(new Set([...(user?.badges || []), ...(dailyBadges || [])])).size}
 / {ALL_BADGES.length} unlocked

        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
        {ALL_BADGES.map((badge) => {
          const earned = hasBadge(badge.id);
          return (
            <div 
              key={badge.id}
              className="relative group"
            >
              <div className={`
                flex flex-col items-center justify-center p-2 rounded-xl transition-all
                ${earned 
                  ? 'bg-violet-600/10 ring-1 ring-violet-500/30' 
                  : 'grayscale opacity-40 bg-white/5'}
              `}>
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full text-xl
                  ${earned 
                    ? 'text-violet-400' 
                    : 'text-gray-500'}
                `}>
                  {badge.icon}
                </div>
                {!earned && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute z-10 px-2 py-1 mb-2 text-xs text-white transition-opacity transform -translate-x-1/2 rounded opacity-0 bottom-full left-1/2 bg-black/80 group-hover:opacity-100 whitespace-nowrap">
                <div className="font-medium">{badge.title}</div>
                {!earned && (
                  <div className="text-xs text-gray-300">How to unlock: {badge.description}</div>
                )}
              </div>
              <div className="w-full mt-2 text-xs text-center text-gray-400 truncate">
                {badge.title}
              </div>
            </div>
          );
        })}
      </div>
        </div>
);
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [todayStats, setTodayStats] = useState(null);
  const [todayLoading, setTodayLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  // Header message
  useEffect(() => {
    if (!user) return;

    setMessage(
      getDailyMessage({
        streak: user.streak ?? 0,
        hasActivityYesterday: (user.streak ?? 0) > 0,
      })
    );
  }, [user]);

  // Fetch Today Snapshot
  useEffect(() => {
    const loadTodaySnapshot = async () => {
      try {
        const snapshot = await api.getTodaySnapshot();
        setTodayStats(snapshot);
      } catch (err) {
        console.error("Dashboard today snapshot error:", err);
      } finally {
        setTodayLoading(false);
      }
    };

    loadTodaySnapshot();
  }, []);
  
useEffect(() => {
  const loadWeeklyActivity = async () => {
    try {
      const data = await api.getWeeklyActivity();
      setWeeklyData(data);
    } catch (err) {
      console.error("Dashboard weekly activity error:", err);
    }
  };

  loadWeeklyActivity();
}, []);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Loading dashboard...
      </div>
    );
  }

  if (!user) return null;


   return (
  <div className="dashboard-root">
    {/* STATIC BACKGROUND */}
    <div className="dashboard-bg"></div>
    <div className="dashboard-overlay"></div>

    {/* SCROLLABLE CONTENT */}
    <div className="min-h-screen px-6 py-6 space-y-10 text-white dashboard-content">

      {/* HEADER */}
      <DashboardHeader
        message={message}
        streak={user.streak ?? 0}
      />

      <ActiveChallenges />

      {/* ACHIEVEMENTS */}
      <Achievements />

      {/* TODAY STATS */}
      <TodayStats stats={todayStats} loading={todayLoading} />

      {/* WEEKLY PROGRESS (still static for now — will fix next) */}
      <WeeklyProgressChart data={weeklyData} />
      </div>
  </div>
);

};

export default Dashboard;