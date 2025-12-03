const FeatureCard = ({ icon, title, description, color }) => {
  // Define color classes based on the color prop
  const colorClasses = {
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
      hover: "hover:border-purple-300"
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-600",
      border: "border-pink-200",
      hover: "hover:border-pink-300"
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      border: "border-indigo-200",
      hover: "hover:border-indigo-300"
    }
  };

  const colors = colorClasses[color] || colorClasses.purple;

  return (
    <div
      className={`bg-white rounded-2xl p-8 shadow-md border transition-all duration-300 ${colors.border} ${colors.hover}`}
    >
      <div className={`w-14 h-14 ${colors.bg} rounded-full flex items-center justify-center ${colors.text} text-3xl mb-4`}>
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2 mb-4">{description}</p>

      <a
        href="#"
        className={`font-semibold hover:underline ${colors.text}`}
      >
        Learn more →
      </a>
    </div>
  );
};

export default FeatureCard;