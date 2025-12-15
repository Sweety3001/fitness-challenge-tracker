import ChallengeCard from "../dashboard/ChallengeCard";

const ActiveChallenges = () => {
  // TEMP STATIC DATA (DB later)
  const challenges = [
    {
      id: 1,
      title: "10K Steps Daily",
      type: "Steps",
      progress: 64,
      daysLeft: 5,
    },
    {
      id: 2,
      title: "7-Day Yoga Flow",
      type: "Yoga",
      progress: 40,
      daysLeft: 3,
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Active Challenges</h2>
        <button className="text-sm text-violet-400 hover:underline">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {challenges.map((c) => (
          <ChallengeCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
};

export default ActiveChallenges;
