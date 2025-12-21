import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

// Function to generate distinct colors for different lines
const getColorForIndex = (index) => {
  const colors = [
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#0ea5e9", // sky blue
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#6366f1", // indigo
  ];
  return colors[index % colors.length];
};

const WeeklyProgressChart = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // Extract challenge names from the data (excluding 'day')
  const challengeNames = data && data.length > 0 
    ? Object.keys(data[0]).filter(key => key !== 'day') 
    : [];

  // Filter data based on selected challenge
  const filteredData = selectedChallenge 
    ? data.map(item => ({
        day: item.day,
        [selectedChallenge]: item[selectedChallenge]
      }))
    : data;

  const displayedChallengeNames = selectedChallenge 
    ? [selectedChallenge]
    : challengeNames;

  return (
    <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-6">
      {/* Header (Clickable) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold">Weekly Activity</h3>
        <span className="text-sm text-gray-400">
          {open ? "▾" : "▸"}
        </span>
      </button>

      {/* Collapsible content */}
      {open && (
        <div className="mt-6 animate-fadeIn">
          {/* Challenge Selector */}
          {challengeNames.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedChallenge(null)}
                className={`px-3 py-1.5 text-sm rounded-full ${
                  selectedChallenge === null
                    ? "bg-violet-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                All Challenges
              </button>
              
              {challengeNames.map((challengeName) => (
                <button
                  key={challengeName}
                  onClick={() => setSelectedChallenge(challengeName)}
                  className={`px-3 py-1.5 text-sm rounded-full ${
                    selectedChallenge === challengeName
                      ? "bg-violet-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {challengeName}
                </button>
              ))}
            </div>
          )}

          {/* Chart Container */}
          <div className="h-64">
            {data && data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b0b12",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  {displayedChallengeNames.map((challengeName, index) => (
                    <Line
                      key={challengeName}
                      type="monotone"
                      dataKey={challengeName}
                      name={challengeName}
                      stroke={getColorForIndex(selectedChallenge ? 0 : index)}
                      strokeWidth={selectedChallenge ? 4 : 3}
                      dot={{ r: selectedChallenge ? 5 : 4 }}
                      activeDot={{ r: selectedChallenge ? 7 : 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-sm text-gray-400 mb-4">
                  No activity data yet.
                </p>
                <button
                  onClick={() => navigate("/challenges")}
                  className="px-4 py-2 text-sm rounded-lg bg-violet-600 hover:bg-violet-700 transition-colors"
                >
                  Add Challenges
                </button>
              </div>
            )}
          </div>
          
          {/* Info text when a challenge is selected */}
          {selectedChallenge && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                Showing progress for <span className="text-violet-400 font-medium">{selectedChallenge}</span>. 
                Select "All Challenges" to view all activities.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyProgressChart;