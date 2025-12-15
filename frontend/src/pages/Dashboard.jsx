import DashboardHeader from "../components/dashboard/DashboardHeader";
import TodayStats from "../components/challenges/TodayStats";
import ActiveChallenges from "../components/challenges/ActiveChallenges";
import WeeklyProgressChart from "../components/charts/WeeklyProgressChart";
import XPCard from "../components/dashboard/XPCard";
import Badges from "../components/dashboard/Badges";
import { useAuth } from "../context/AuthContext";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return null; // ProtectedRoute already handles redirect
  }

  return (
    <div className="min-h-screen px-6 py-6 space-y-8 text-white bg-black">
      <DashboardHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <XPCard xp={user.xp || 0} level={user.level || 1} />
        <Badges badges={user.badges || []} />
      </div>

      <TodayStats />
      <WeeklyProgressChart data={weeklyData} />
      <ActiveChallenges />
    </div>
  );
};


export default Dashboard;
