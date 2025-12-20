import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyProgressChart = ({ data }) => {
  const [open, setOpen] = useState(false);

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
        <div className="h-64 mt-6 animate-fadeIn">
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b0b12",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="steps"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-400">
              No activity data yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyProgressChart;
