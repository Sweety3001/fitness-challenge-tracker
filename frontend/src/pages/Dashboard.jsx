import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import XPCard from "../components/dashboard/XPCard";
import Badges from "../components/dashboard/Badges";

import TodayStats from "../components/challenges/TodayStats";
import ActiveChallenges from "../components/challenges/ActiveChallenges";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";


const weeklyData = [
  { day: "Mon", steps: 4200 },
  { day: "Tue", steps: 5100 },
  { day: "Wed", steps: 6200 },
  { day: "Thu", steps: 4800 },
  { day: "Fri", steps: 7000 },
  { day: "Sat", steps: 8300 },
  { day: "Sun", steps: 6420 },
];

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Loading dashboard...
      </div>
    );
  }

  if (!user) return null; // ProtectedRoute handles redirect

  return (
    <div className="min-h-screen px-6 py-6 space-y-10 text-white bg-black">

      {/* HEADER */}
      <DashboardHeader />

      {/* XP + BADGES */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <XPCard xp={user.xp ?? 0} level={user.level ?? 1} />
        <Badges badges={user.badges ?? []} />
      </div>

      {/* TODAY STATS */}
      <TodayStats />

      {/* WEEKLY PROGRESS */}
      <WeeklyProgressChart data={weeklyData} />

      {/* CHALLENGES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Challenges</h2>
          <button
      onClick={() => navigate("/add-challenge")}
      className="px-5 py-2 font-medium rounded-lg bg-violet-600 hover:bg-violet-700"
    >
      + Add Challenge
    </button>
        </div>

        {/* Joined / Pinned challenges */}
        <ActiveChallenges />
      </section>
    

    </div>
  );
};

export default Dashboard;
