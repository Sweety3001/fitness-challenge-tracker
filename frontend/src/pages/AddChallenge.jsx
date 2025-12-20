import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const AddChallenge = () => {
  const navigate = useNavigate();

  // ✅ challenges from MongoDB
  const [challenges, setChallenges] = useState([]);

  // ✅ selected MongoDB _id's
  const [selected, setSelected] = useState([]);

  // ✅ FETCH challenges from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Fetch challenges error:", err));
  }, []);

  // ✅ toggle selection
  const toggleChallenge = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // ✅ SAVE selected challenges
const handleSave = async () => {
  if (selected.length === 0) {
    alert("Please select at least one challenge");
    return;
  }

  try {
    const res = await api.joinChallenges(selected);

    // ✅ force refresh dashboard data
    navigate("/dashboard", { replace: true });
  } catch (err) {
    console.error("Join challenge error:", err);
    alert("Failed to save challenges");
  }
};




  return (
    <div className="min-h-screen px-6 py-8 text-white bg-black">
      <h1 className="mb-2 text-3xl font-bold">Add Challenges</h1>
      <p className="mb-8 text-gray-400">
        Select challenges you want to participate in
      </p>

      {/* ✅ Challenges from DB */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {challenges.map((c) => (
          <div
            key={c._id}
            onClick={() => toggleChallenge(c._id)}
            className={`cursor-pointer rounded-xl p-5 border transition
              ${
                selected.includes(c._id)
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/10 hover:border-white/30"
              }`}
          >
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="text-sm text-gray-400">
              Goal: {c.defaultGoal} {c.unit}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-10">
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-700"
        >
          Save Challenges
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 border rounded-lg border-white/20 hover:bg-white/10"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddChallenge;
