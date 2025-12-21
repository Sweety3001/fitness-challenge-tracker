/* =====================
   LEVEL CALCULATION
   ===================== */
export const calculateLevel = (xp) => {
  return Math.floor(xp / 500) + 1;
};

/* =====================
   AWARD XP + BADGES
   ===================== */
export const awardXP = (user, xpToAdd) => {
  if (typeof user.xp !== "number") {
    user.xp = 0;
  }

  if (!Array.isArray(user.badges)) {
    user.badges = [];
  }

  user.xp += xpToAdd;
  user.level = calculateLevel(user.xp);

  // 🏅 Badges
  if (user.xp >= 500 && !user.badges.includes("Starter")) {
    user.badges.push("Starter");
  }

  if (user.xp >= 1500 && !user.badges.includes("Consistency King")) {
    user.badges.push("Consistency King");
  }
};
