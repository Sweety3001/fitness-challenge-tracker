import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import ChallengeCard from "./ChallengeCard";
import LogActivityModal from "./LogActivityModal";

const ActiveChallenges = ({onActivityLogged}) => {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const [todayStats, setTodayStats] = useState(null);

  /* ===============================
     FETCH USER CHALLENGES
  =============================== */
  const fetchChallenges = async () => {
    try {
      const data = await api.getMyChallenges();
      setChallenges(data.filter((uc) => uc.challenge));
    } catch (err) {
      console.error("FETCH CHALLENGES ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     FETCH TODAY SNAPSHOT
  =============================== */
  // const fetchTodayStats = async () => {
  //   try {
  //     const data = await api.getTodaySnapshot();
  //     setTodayStats(data);
  //   } catch (err) {
  //     console.error("FETCH TODAY STATS ERROR:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchChallenges();
  //   fetchTodayStats();
  // }, []);

  useEffect(() => {
  fetchChallenges();
  // fetchTodayStats();
}, [new Date().toDateString()]);

  useEffect(() => {
    document.body.style.overflow = activeChallenge ? "hidden" : "auto";
  }, [activeChallenge]);

  /* ===============================
     LOG HANDLER (FIXED)
  =============================== */
  const handleLog = (uc) => {
  setActiveChallenge({
    userChallengeId: uc._id,              // UserChallenge ID
    challengeId: uc.challenge._id,         // REAL Challenge ID
    challengeType: uc.challenge.type,      // steps / calories / pushups
  });
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

  if (loading) return <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-8 text-center">
    <div className="flex justify-center">
      <div className="w-6 h-6 border-2 rounded-full border-violet-500 border-t-transparent animate-spin"></div>
    </div>
    <p className="mt-3 text-gray-400">Loading your challenges...</p>
  </div>;

  if (challenges.length === 0) {
    return (
      <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-8 text-center space-y-4 transition-all duration-300 hover:border-white/20">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white">No Challenges Yet</h3>
        <p className="text-gray-400">Start your fitness journey by adding your first challenge!</p>
        <button
          onClick={() => navigate("/challenges")}
          className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-violet-500/10 font-medium"
        >
          + Add Your First Challenge
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Challenges</h2>
        </div>
        <button
          onClick={() => navigate("/challenges")}
          className="px-4 py-2.5 text-sm rounded-lg bg-violet-600 hover:bg-violet-700 transition-all duration-200 font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Challenge
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {/* {challenges.map((uc) => {
          // const goal = uc.challenge.defaultGoal ?? 1;
          // const progressPercent = Math.min(
          //   Math.round((uc.progress / goal) * 100),
          //   100
          // );
          const progressPercent = uc.progress ?? 0;

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
        })} */}
        {challenges.map((uc) => {
  const progressPercent = uc.progress;

  return (
    <ChallengeCard
      key={uc._id}
      title={uc.challenge.title}
      type={uc.challenge.type}
      progress={progressPercent}
      completedToday={uc.completedToday}
      ucId={uc._id}
      onLog={() => handleLog(uc)}
      onRemove={removeChallenge}
      todayValue={uc.todayValue}
      target={uc.challenge.defaultGoal}
      unit={uc.challenge.unit}
    />
  );
})}

      </div>

      {activeChallenge && (
  <LogActivityModal
    challengeType={activeChallenge.challengeType}
    challengeId={activeChallenge.challengeId}
    onClose={() => setActiveChallenge(null)}
    onLogged={() => {
      setActiveChallenge(null);
      fetchChallenges();
      // fetchTodayStats();
      if(onActivityLogged) onActivityLogged();
    }}
  />
)}
    </>
  );
};

export default ActiveChallenges;