import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import XPCard from "../components/dashboard/XPCard";
import Badges from "../components/dashboard/Badges";
import TodayStats from "../components/challenges/TodayStats";
import ActiveChallenges from "../components/challenges/ActiveChallenges";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";
import ProgressCard from "../components/dashboard/ProgressCard";

import { api } from "../api/api";
import { getDailyMessage } from "../utils/getDailyMessage";

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
    <div className="min-h-screen px-6 py-6 space-y-10 text-white bg-black">
      {/* HEADER */}
      <DashboardHeader
        message={message}
        streak={user.streak ?? 0}
        xp={user.xp ?? 0}
        level={user.level ?? 1}
      />
      <div className="flex justify-end">
 

</div>

      <ActiveChallenges />

      {/* XP + BADGES */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  <ProgressCard
    level={user.level ?? 1}
    xp={user.xp ?? 0}
  />
  <Badges badges={user.badges ?? []} />
</div>


      {/* TODAY STATS */}
      <TodayStats stats={todayStats} loading={todayLoading} />

      {/* WEEKLY PROGRESS (still static for now — will fix next) */}
      <WeeklyProgressChart data={weeklyData} />
    </div>
  );
};

export default Dashboard;
