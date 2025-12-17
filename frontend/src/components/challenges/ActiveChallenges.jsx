import { useEffect, useState } from "react";
import { api } from "../../api/api";
import ChallengeCard from "./ChallengeCard";

const ActiveChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ FIXED

  useEffect(() => {
    console.log("ActiveChallenges mounted");

    api.getMyChallenges()
      .then((data) => {
        console.log("MY CHALLENGES DATA:", data);
        setChallenges(data);
      })
      .catch((err) => console.error("FETCH ERROR:", err))
      .finally(() => setLoading(false)); // ✅ now defined
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading challenges...</p>;
  }

  if (challenges.length === 0) {
    return (
      <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-6 text-center text-gray-400">
        You haven’t joined any challenges yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {challenges.map((uc) => {
        const progressPercent = Math.min(
          Math.round(
            (uc.progress / uc.challenge.defaultGoal) * 100
          ),
          100
        );

        return (
          <ChallengeCard
            key={uc._id}
            title={uc.challenge.title}
            type={uc.challenge.type}
            progress={progressPercent}
            daysLeft="—"
          />
        );
      })}
    </div>
  );
};

export default ActiveChallenges;
