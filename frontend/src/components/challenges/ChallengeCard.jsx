import { useNavigate } from "react-router-dom";

// const ChallengeCard = ({
//   title,
//   type,
//   progress,
//   ucId,
//   onRemove,
//   onLog,
//   todayValue,
//   target,
//   unit,
// }) => {
  const ChallengeCard = ({
  title,
  type,
  progress,
  completedToday,
  ucId,
  onRemove,
  onLog,
  todayValue,
  target,
  unit,
}) => {

  const navigate = useNavigate();

  // const isCompleted = progress >= 100;
  const isCompleted = completedToday===true;
  const canLog = type === "steps" || !isCompleted; // New boolean for logging logic
  const isActiveSteps = type === "steps" && !isCompleted;
  const isTargetReached =
  typeof todayValue === "number" &&
  typeof target === "number" &&
  todayValue >= target;

  return (
    <div
      className={`
        border rounded-2xl p-5 transition-all duration-300 transform hover:scale-[1.02]
        ${
          isCompleted
            ? "bg-[#0b0b12] border-white/5 opacity-70"
            : isActiveSteps
            ? "bg-[#0b0b12] border-violet-500/40 shadow-lg shadow-violet-500/10"
            : "bg-[#0b0b12] border-white/10 hover:border-white/30"
        }
      `}
    >
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          {title}
          {isCompleted && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Completed
            </span>
          )}
        </h3>

        <span
          className={`
            px-2.5 py-1 text-xs rounded-full font-medium
            ${
              isActiveSteps
                ? "bg-violet-600/20 text-violet-400"
                : "bg-white/10 text-gray-400"
            }
          `}
        >
          {type}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between mb-2 text-sm text-gray-400">
          <span>Progress</span>
          <span>{Number(progress) || 0}%</span>
        </div>

        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          {/* <div
            className={`h-full rounded-full ${
              isCompleted
                ? "bg-green-500"
                : "bg-gradient-to-r from-violet-500 to-purple-600"
            }`}
            style={{ width: `${Number(progress) > 0 ? Math.min(progress, 100) : 0}%` }}

          />
        </div> */}
        <div
  className={`h-full rounded-full ${
    isTargetReached
      ? "bg-green-500"
      : "bg-gradient-to-r from-violet-500 to-purple-600"
  }`}
  style={{ width: `${Number(progress) > 0 ? Math.min(progress, 100) : 0}%` }}
/>
</div>

        {/* Steps-only today info */}
        {/* {type === "steps" && typeof todayValue === "number" && target && (
          <p className="mt-3 text-sm text-gray-400">
            Today:{" "}
            <span className="font-medium text-white">
              {todayValue.toLocaleString()}
            </span>{" "}
            / {target.toLocaleString()} {unit}
          </p>
        )} */}
        {/* Today progress (ALL challenges) */}
{typeof todayValue === "number" && typeof target === "number" && (
  <p className="mt-3 text-sm text-gray-400">
    Today:{" "}
    <span className="font-medium text-white">
      {todayValue.toLocaleString()}
    </span>{" "}
    / {target.toLocaleString()} {unit}
  </p>
)}

      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <button
          onClick={() => navigate(`/challenge/${ucId}`)}
          className="flex items-center text-sm font-medium text-violet-400 hover:text-violet-300"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {canLog && onLog && (
            <button
              onClick={() => onLog(type)}
              className="px-3 py-1.5 text-xs rounded-lg bg-violet-600 hover:bg-violet-700 transition-all duration-200 font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {type === "steps" ? "Log Today" : "Log"}
            </button>
          )}

          {onRemove && (
            <button
              onClick={() => onRemove(ucId)}
              className="px-3 py-1.5 text-xs text-red-400 rounded-lg bg-red-400/10 hover:bg-red-400/20 transition-all duration-200 font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;