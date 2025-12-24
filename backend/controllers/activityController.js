import ActivityLog from "../models/ActivityLog.js";
import UserChallenge from "../models/UserChallenge.js";
import DailyActivity from "../models/DailyActivity.js";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";
// import { BADGES } from "../utils/badges.js";

const getToday = () => new Date().toISOString().split("T")[0];


const getTodayAchievements = async (req, res) => {
  const badges = await evaluateAchievements(req.user._id);
  res.json({
    dailyUnlocked: badges.dailyUnlocked
  });
};


const getTodaySummary = async (req, res) => {
  try {
    const today = getToday();

    const activityLogs = await ActivityLog.find({
      user: req.user._id,
      date: today,
    }).populate("challenge");

    let totalSteps = 0;
    let totalCalories = 0;

    for (const log of activityLogs) {
      if (!log.challenge) continue;

      if (log.challenge.type === "steps") totalSteps += log.value;
      if (log.challenge.type === "calories") totalCalories += log.value;
    }

    const daily = await DailyActivity.findOne({
      user: req.user._id,
      date: today,
    });

    if (daily) {
      totalSteps += daily.steps || 0;
      totalCalories += daily.calories || 0;
    }

    res.json({
      steps: totalSteps,
      calories: totalCalories,
    });
  } catch (err) {
    console.error("TODAY SUMMARY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch today summary" });
  }
};

/* ======================================================
   ACHIEVEMENT EVALUATION (SINGLE SOURCE OF TRUTH)
====================================================== */
const evaluateAchievements = async (userId) => {
  const user = await User.findById(userId);
  const today = getToday();

  // ✅ get ALL today logs (no challenge filter)
 const activityLogs = await ActivityLog.find({
  user: userId,
  date: today,
}).populate("challenge");


  let totalSteps = 0;
  let totalCalories = 0;
  let totalActiveMinutes = 0;

  // for (const log of activityLogs) {
  //   const challenge = await Challenge.findById(log.challenge);
  //   if (!challenge) continue;

  //   if (challenge.type === "steps") totalSteps += log.value;
  //   if (challenge.type === "calories") totalCalories += log.value;
  //   if (challenge.type === "active") totalActiveMinutes += log.value;
  // }
for (const log of activityLogs) {
  if (!log.challenge) continue;

  if (log.challenge.type === "steps") totalSteps += log.value;
  if (log.challenge.type === "calories") totalCalories += log.value;
  if (log.challenge.type === "active") totalActiveMinutes += log.value;
}


  const daily = await DailyActivity.findOne({ user: userId, date: today });

  if (daily) {
    totalSteps += daily.steps || 0;
    totalCalories += daily.calories || 0;
    totalActiveMinutes += daily.workoutMinutes || 0;
  }

  const permanentUnlocked = [];
  const dailyUnlocked = [];

  // for (const badge of BADGES) {
  //   switch (badge.key) {
  //     case "first_challenge": {
  //       const hasAnyActivity = await ActivityLog.exists({ user: userId });
  //       if (hasAnyActivity && !user.badges.includes(badge.key)) {
  //         permanentUnlocked.push(badge.key);
  //       }
  //       break;
  //     }

  //     case "steps_10k_day":
  //       if (totalSteps >= 10000) dailyUnlocked.push(badge.key);
  //       break;

  //     case "calorie_crusher":
  //       if (totalCalories >= 500) dailyUnlocked.push(badge.key);
  //       break;

  //     case "streak_7":
  //       if (user.streak >= 7 && !user.badges.includes(badge.key)) {
  //         permanentUnlocked.push(badge.key);
  //       }
  //       break;

  //     case "streak_30":
  //       if (user.streak >= 30 && !user.badges.includes(badge.key)) {
  //         permanentUnlocked.push(badge.key);
  //       }
  //       break;
  //   }
  // }
  // 
if (totalSteps >= 10000) {
  dailyUnlocked.push("steps_10k_day");
}

if (totalCalories >= 500) {
  dailyUnlocked.push("calorie_crusher");
}

// -------- PERMANENT BADGES --------
const hasAnyActivity = await ActivityLog.exists({ user: userId });

if (hasAnyActivity && !user.badges.includes("first_challenge")) {
  permanentUnlocked.push("first_challenge");
}

if (user.streak >= 7 && !user.badges.includes("streak_7")) {
  permanentUnlocked.push("streak_7");
}

if (user.streak >= 30 && !user.badges.includes("streak_30")) {
  permanentUnlocked.push("streak_30");
}
const completedChallenge = await UserChallenge.exists({
  user: userId,
  completed: true
});

if (completedChallenge && !user.badges.includes("marathon_runner")) {
  permanentUnlocked.push("marathon_runner");
}
// const hours = activityLogs.map(log => new Date(log.createdAt).getHours());
const hours = [
  ...activityLogs.map(log => new Date(log.createdAt).getHours()),
  daily ? new Date(daily.updatedAt).getHours() : null
].filter(h => h !== null);

if (hours.some(h => h < 8)) {
  dailyUnlocked.push("early_bird");
}

if (hours.some(h => h >= 22)) {
  dailyUnlocked.push("night_owl");
}

  if (permanentUnlocked.length > 0) {
    user.badges.push(...permanentUnlocked);
    user.badges = [...new Set(user.badges)];
    await user.save();
  }
const uniqueDailyUnlocked = [...new Set(dailyUnlocked)];

  // return { permanentUnlocked, dailyUnlocked };
  return {
  permanentUnlocked,
  dailyUnlocked: uniqueDailyUnlocked
};
};



/* ======================================================
   STREAK UPDATE LOGIC
====================================================== */
const updateStreak = async (userId) => {
  const user = await User.findById(userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (!user.lastActiveDate) {
    // first ever activity
    user.streak = 1;
  } else {
    const last = new Date(user.lastActiveDate);
    last.setHours(0, 0, 0, 0);

    if (last.getTime() === yesterday.getTime()) {
      user.streak += 1; // consecutive day
    } else if (last.getTime() !== today.getTime()) {
      user.streak = 1; // streak broken
    }
  }

  user.lastActiveDate = today;
  await user.save();

  return user.streak;
};


/* ======================================================
   LOG ACTIVITY (MANUAL + AUTO)
====================================================== */
const logActivity = async (req, res) => {
  try {
    const { challengeId, value, type } = req.body;
    const today = getToday();

    if (!value || value <= 0) {
      return res.status(400).json({ message: "Invalid value" });
    }

    // ================= DAILY (NON-CHALLENGE)
    if (!challengeId) {
      const update = {};
      if (type === "steps") update.steps = value;
      if (type === "calories") update.calories = value;
      if (type === "active") update.workoutMinutes = value;

      await DailyActivity.findOneAndUpdate(
        { user: req.user._id, date: today },
        { $inc: update },
        { upsert: true, new: true }
      );

      await updateStreak(req.user._id);

      const badges = await evaluateAchievements(req.user._id);
      const user = await User.findById(req.user._id);

      return res.json({
        success: true,
        permanentBadges: user.badges,
        dailyUnlocked: badges.dailyUnlocked,
        newlyUnlocked: badges.permanentUnlocked,
      });
    }

    // ================= CHALLENGE LOG
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    await ActivityLog.create({
      user: req.user._id,
      challenge: challengeId,
      value,
      date: today,
    });

    await updateStreak(req.user._id);

    // const uc = await UserChallenge.findOneAndUpdate(
    //   { user: req.user._id, challenge: challengeId },
    //   { $inc: { progress: value } },
    //   { new: true }
    // );

    // if (uc && !uc.completed && uc.progress >= challenge.defaultGoal) {
    //   uc.completed = true;
    //   uc.completedAt = new Date();
    //   await uc.save();
    // }

    // await DailyActivity.findOneAndUpdate(
    //   { user: req.user._id, date: today },
    //   { $inc: { workoutMinutes: value } },
    //   { upsert: true }
    // );
// ✅ update DailyActivity correctly based on challenge type
const dailyInc = {};

if (challenge.type === "steps") {
  dailyInc.steps = value;
}

if (challenge.type === "calories") {
  dailyInc.calories = value;   // 🔥 THIS FIXES LIVE SNAPSHOT
}

if (challenge.type === "active") {
  dailyInc.workoutMinutes = value;
}

if (Object.keys(dailyInc).length > 0) {
  await DailyActivity.findOneAndUpdate(
    { user: req.user._id, date: today },
    { $inc: dailyInc },
    { upsert: true, new: true }
  );
}

    const badges = await evaluateAchievements(req.user._id);
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      permanentBadges: user.badges,
      dailyUnlocked: badges.dailyUnlocked,
      newlyUnlocked: badges.permanentUnlocked,
    });
  } catch (err) {
    console.error("LOG ACTIVITY ERROR:", err);
    res.status(500).json({ message: "Failed to log activity" });
  }
};

/* ======================================================
   LOG STEPS (MULTIPLE TIMES / OVER 100%)
====================================================== */
const logSteps = async (req, res) => {
  try {
    const { challengeId, steps } = req.body;
    const today = getToday();

    if (!steps || steps <= 0) {
      return res.status(400).json({ message: "Invalid steps value" });
    }

    if (challengeId) {
      const challenge = await Challenge.findById(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      await ActivityLog.create({
        user: req.user._id,
        challenge: challengeId,
        value: steps,
        date: today,
      });

      // const uc = await UserChallenge.findOneAndUpdate(
      //   { user: req.user._id, challenge: challengeId },
      //   { $inc: { progress: steps } },
      //   { new: true }
      // );

      // if (uc && !uc.completed && uc.progress >= challenge.defaultGoal) {
      //   uc.completed = true;
      //   uc.completedAt = new Date();
      //   await uc.save();
      // }
    }

    await DailyActivity.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $inc: { steps, workoutMinutes: Math.floor(steps / 20) } },
      { upsert: true }
    );

    await updateStreak(req.user._id);

    const badges = await evaluateAchievements(req.user._id);
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      permanentBadges: user.badges,
      dailyUnlocked: badges.dailyUnlocked,
      newlyUnlocked: badges.permanentUnlocked,
    });
  } catch (err) {
    console.error("LOG STEPS ERROR:", err);
    res.status(500).json({ message: "Failed to log steps" });
  }
};

export { logActivity, logSteps, getTodayAchievements, getTodaySummary};
