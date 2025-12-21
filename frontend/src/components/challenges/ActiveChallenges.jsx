import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import ChallengeCard from "./ChallengeCard";
import LogActivityModal from "./LogActivityModal";

const ActiveChallenges = () => {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChallenge, setActiveChallenge] = useState(null);

  // 🔹 Today snapshot (steps, calories, etc.)
  const [todayStats, setTodayStats] = useState(null);

  /* ===============================
     FETCH USER CHALLENGES
     =============================== */
  const fetchChallenges = async () => {
    try {
      const data = await api.getMyChallenges();
      const valid = data.filter((uc) => uc.challenge);
      setChallenges(valid);
    } catch (err) {
      console.error("FETCH CHALLENGES ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     FETCH TODAY SNAPSHOT
     =============================== */
  const fetchTodayStats = async () => {
    try {
      const data = await api.getTodaySnapshot();
      setTodayStats(data);
    } catch (err) {
      console.error("FETCH TODAY STATS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchTodayStats();
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeChallenge ? "hidden" : "auto";
  }, [activeChallenge]);

  /* ===============================
     LOG HANDLER
     =============================== */
  const handleLog = (challenge) => {
    setActiveChallenge(challenge);
  };

  /* ===============================
     REMOVE CHALLENGE
     =============================== */
  const removeChallenge = async (id) => {
    try {
      await api.removeChallenge(id);
      setChallenges((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("REMOVE CHALLENGE ERROR:", err);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading challenges...</p>;
  }

  if (challenges.length === 0) {
    return (
      <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-8 text-center space-y-4">
        <p className="text-gray-400">You haven’t added any challenges yet.</p>
        <button
          onClick={() => navigate("/challenges")}
          className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
        >
          + Add Challenges
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Challenges</h2>
        <button
          onClick={() => navigate("/challenges")}
          className="px-4 py-2 text-sm rounded-lg bg-violet-600 hover:bg-violet-700"
        >
          + Add Challenges
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {challenges.map((uc) => {
          const goal = uc.challenge.defaultGoal ?? 1;

          const progressPercent = Math.min(
            Math.round((uc.progress / goal) * 100),
            100
          );

          return (
            <ChallengeCard
              key={uc._id}
              title={uc.challenge.title}
              type={uc.challenge.type}
              progress={progressPercent}
              ucId={uc._id}
              onLog={() => handleLog(uc)}
              onRemove={removeChallenge}
              todayValue={
                uc.challenge.type === "steps"
                  ? todayStats?.steps ?? 0
                  : undefined
              }
              target={
                uc.challenge.type === "steps"
                  ? uc.challenge.defaultGoal
                  : undefined
              }
              unit={uc.challenge.type === "steps" ? "steps" : undefined}
            />
          );
        })}
      </div>

      {activeChallenge && (
        <LogActivityModal
          challengeType={activeChallenge.challenge.type}
          challengeId={activeChallenge._id}
          onClose={() => setActiveChallenge(null)}
          onLogged={() => {
            setActiveChallenge(null);
            fetchChallenges();
            fetchTodayStats();
          }}
        />
      )}
    </>
  );
};

export default ActiveChallenges;
