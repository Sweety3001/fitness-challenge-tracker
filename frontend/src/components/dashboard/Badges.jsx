import { useState } from "react";

const Badges = ({ badges }) => {
  const [open, setOpen] = useState(false);

  if (!badges || badges.length === 0) return null;

  return (
    <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full"
      >
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          🎖 Badges
          <span className="text-xs text-gray-400">
            ({badges.length})
          </span>
        </h3>
        <span className="text-gray-400">
          {open ? "▾" : "▸"}
        </span>
      </button>

      {/* Collapsible list */}
      {open && (
        <div className="flex flex-wrap gap-3 mt-4">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded-full bg-violet-600/20 text-violet-300"
            >
              🏅 {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Badges;
