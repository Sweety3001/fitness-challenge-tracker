export const getDailyMessage = ({ streak, hasActivityYesterday }) => {
  const hour = new Date().getHours();

  // 🔥 Streak-based messages
  if (streak >= 30) {
    return "🏆 Legendary! 30-day streak — you’re unstoppable";
  }

  if (streak >= 7) {
    return `🔥 ${streak}-day streak! Don’t break it today`;
  }

  if (streak > 0) {
    return `Keep it going — Day ${streak} of consistency 💪`;
  }

  // 😴 Missed yesterday
  if (!hasActivityYesterday) {
    return "Yesterday was quiet — today is your comeback 🚀";
  }

  // ⏰ Time-based fallback
  if (hour < 12) {
    return "Good morning! One small win today goes a long way ☀️";
  }

  if (hour < 18) {
    return "Midday check-in — let’s move a little 🏃‍♀️";
  }

  return "Wrap up strong — even 10 minutes counts 🌙";
};
