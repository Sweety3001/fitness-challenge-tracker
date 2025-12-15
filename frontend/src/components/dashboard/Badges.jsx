const Badges = ({ badges }) => {
  return (
    <div className="bg-[#0b0b12] border border-white/10 rounded-xl p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Badges Earned
      </h3>

      {badges.length === 0 ? (
        <p className="text-sm text-gray-400">No badges yet</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
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
