exports.calculateLevel = (xp) => {
  return Math.floor(xp / 500) + 1;
};

exports.awardXP = (user, xpToAdd) => {
  user.xp += xpToAdd;
  user.level = exports.calculateLevel(user.xp);

  // Example badges
  if (user.xp >= 500 && !user.badges.includes("Starter")) {
    user.badges.push("Starter");
  }

  if (user.xp >= 1500 && !user.badges.includes("Consistency King")) {
    user.badges.push("Consistency King");
  }
};
