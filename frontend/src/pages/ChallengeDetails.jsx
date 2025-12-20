import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import ChallengeProgressChart from "../components/charts/ChallengeProgressChart";

const ChallengeDetails = () => {
  const { id } = useParams(); // userChallengeId
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await api.getChallengeDetails(id);
        setChartData(res);
      } catch (err) {
        console.error("ChallengeDetails error:", err);
        setError("Failed to load challenge details");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-400">Loading challenge…</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;
  if (!chartData) return <p className="p-6 text-red-400">No data found</p>;

  const { challenge, progress, graph } = chartData;

  return (
    <div className="min-h-screen px-6 py-8 space-y-6 text-white bg-black">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{challenge.title}</h1>
        <p className="text-gray-400">
          Goal: {challenge.goal} {challenge.unit}
        </p>
      </div>

      {/* PROGRESS */}
      <p className="font-medium text-violet-400">
        Current Progress: {progress}
      </p>

      {/* GRAPH */}
      <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-5 h-[300px] md:h-[400px ]">
        <h2 className="mb-4 text-lg font-semibold">Last 7 Days</h2>
        <ChallengeProgressChart data={graph} />
      </div>
    </div>
  );
};

export default ChallengeDetails;
