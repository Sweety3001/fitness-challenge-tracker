import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import ChallengeProgressChart from "../components/charts/ChallengeProgressChart";

const ChallengeDetails = () => {
  const { id } = useParams(); // userChallengeId
  const navigate = useNavigate();
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

  if (loading) return (
    <div className="min-h-screen px-6 py-8 text-white bg-black">
      <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-8 text-center">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-400">Loading challenge details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen px-6 py-8 text-white bg-black">
      <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 mt-4 text-sm rounded-lg bg-violet-600 hover:bg-violet-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
  
  if (!chartData) return (
    <div className="min-h-screen px-6 py-8 text-white bg-black">
      <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <p className="text-yellow-400">No data found for this challenge</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 mt-4 text-sm rounded-lg bg-violet-600 hover:bg-violet-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  const { challenge, progress, graph } = chartData;

  return (
    <div className="min-h-screen px-4 py-8 text-white bg-black sm:px-6">
      {/* HEADER */}
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
          <div></div> {/* Spacer for alignment */}
        </div>
        
        <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-6">
          <h1 className="text-2xl font-bold sm:text-3xl">{challenge.title}</h1>
          <p className="mt-2 text-gray-400">
            Goal: {challenge.goal?.toLocaleString()} {challenge.unit}
          </p>
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Current Progress</span>
              <span className="font-medium text-violet-400">{progress?.toLocaleString() || 0} {challenge.unit}</span>
            </div>
            <div className="mt-2">
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                  style={{ width: `${Math.min(100, progress && challenge.goal ? (progress / challenge.goal) * 100 : 0)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRAPH */}
      <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-5 h-[300px] md:h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Last 7 Days Progress</h2>
          <span className="text-sm text-gray-400">Daily activity</span>
        </div>
        <ChallengeProgressChart data={graph} />
      </div>
    </div>
  );
};

export default ChallengeDetails;