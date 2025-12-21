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
    <div className="min-h-screen px-4 py-8 text-white bg-black sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-violet-400 hover:text-violet-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold sm:text-3xl">Add Challenges</h1>
          <div></div> {/* Spacer for alignment */}
        </div>
        
        <p className="text-gray-400">
          Select challenges you want to participate in
        </p>
        <div className="mt-2 text-sm text-gray-500">
          {selected.length > 0 ? (
            <span>{selected.length} challenge{selected.length !== 1 ? 's' : ''} selected</span>
          ) : (
            <span>No challenges selected</span>
          )}
        </div>
      </div>

      {/* Challenges Grid */}
      {challenges.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c) => (
            <div
              key={c._id}
              onClick={() => toggleChallenge(c._id)}
              className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 transform hover:scale-[1.02]
                ${
                  selected.includes(c._id)
                    ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                    : "border-white/10 hover:border-white/30 bg-[#0b0b12]"
                }`}
            >
              <div className="flex justify-between mb-3">
                <h2 className="text-lg font-semibold">{c.title}</h2>
                {selected.includes(c._id) && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  <span className="font-medium">Goal:</span> {c.defaultGoal} {c.unit}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 text-xs rounded bg-white/10 text-gray-300">
                    {c.type}
                  </span>
                  <span className="px-2 py-1 text-xs rounded bg-white/10 text-gray-300">
                    {c.duration} days
                  </span>
                </div>
              </div>
              
              {selected.includes(c._id) && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-xs text-violet-400">Selected for joining</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-[#0b0b12] border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mb-2 text-lg font-medium text-gray-300">No challenges available</h3>
          <p className="text-gray-500">Check back later for new challenges to join.</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-10 sm:flex-row">
        <button
          onClick={handleSave}
          disabled={selected.length === 0}
          className={`px-6 py-3 rounded-lg font-medium transition
            ${selected.length > 0 
              ? "bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/10" 
              : "bg-violet-600/50 cursor-not-allowed"}`}
        >
          Join Selected Challenges
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 border rounded-lg border-white/20 hover:bg-white/10 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddChallenge;