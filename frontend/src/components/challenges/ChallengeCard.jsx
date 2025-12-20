import { useNavigate } from "react-router-dom";

const ChallengeCard = ({
  title,
  type,
  progress,
  ucId,
  onRemove,
  onLog,
  todayValue,
  target,
  unit,
}) => {
  const navigate = useNavigate();

  const isCompleted = progress >= 100;
  const isActiveSteps = type === "steps" && !isCompleted;

  return (
    <div
      className={`
        border rounded-xl p-5 transition-all
        ${
          isCompleted
            ? "bg-[#0b0b12] border-white/5 opacity-60"
            : isActiveSteps
            ? "bg-[#0b0b12] border-violet-500/40 shadow-lg shadow-violet-500/10"
            : "bg-[#0b0b12] border-white/10"
        }
      `}
    >
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          {title}
          {isCompleted && (
            <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400">
              Completed ✓
            </span>
          )}
        </h3>

        <span
          className={`
            px-2 py-1 text-xs rounded
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
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 rounded-full bg-white/10">
          <div
            className={`h-2 rounded-full ${
              isCompleted
                ? "bg-green-500"
                : "bg-gradient-to-r from-violet-500 to-purple-600"
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Steps-only today info */}
        {type === "steps" && typeof todayValue === "number" && target && (
          <p className="mt-2 text-sm text-gray-400">
            Today:{" "}
            <span className="font-medium text-white">
              {todayValue}
            </span>{" "}
            / {target} {unit}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between text-sm">
        <button
          onClick={() => navigate(`/challenge/${ucId}`)}
          className="text-violet-400 hover:underline"
        >
          View Details
        </button>

        <div className="flex gap-2">
          {!isCompleted && onLog && (
            <button
              onClick={() => onLog(type)}
              className="px-3 py-1 text-xs rounded bg-violet-600 hover:bg-violet-700"
            >
              {type === "steps" ? "Log Today" : "Log"}
            </button>
          )}

          {onRemove && (
            <button
              onClick={() => onRemove(ucId)}
              className="px-3 py-1 text-xs text-red-400 rounded bg-red-400/10 hover:bg-red-400/20"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
