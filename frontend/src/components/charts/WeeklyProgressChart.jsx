import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const WeeklyProgressChart = ({ data }) => {
  return (
    <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Weekly Activity
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b0b12",
              border: "1px solid #27272a",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="steps"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyProgressChart;
