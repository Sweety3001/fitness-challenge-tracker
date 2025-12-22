import ActivityLog from "../models/ActivityLog.js";
import UserChallenge from "../models/UserChallenge.js";
import DailyActivity from "../models/DailyActivity.js";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";
import { BADGES } from "../utils/badges.js";

const getToday = () => new Date().toISOString().split("T")[0];

/* ======================================================
   ACHIEVEMENT EVALUATION (SINGLE SOURCE OF TRUTH)
====================================================== */
const evaluateAchievements = async (userId) => {
  const user = await User.findById(userId);
  const today = getToday();
const getToday = () => new Date().toISOString().split("T")[0];

  // const activityLogs = await ActivityLog.find({
  //   user: userId,
  //   date: today,
  // });
  const logs = await ActivityLog.find({
  user: userId,
  challenge: challengeId,
  date: today
});

  let totalSteps = 0;
  let totalCalories = 0;
  let totalActiveMinutes = 0;

  for (const log of activityLogs) {
    const challenge = await Challenge.findById(log.challenge);
    if (!challenge) continue;

    if (challenge.type === "steps") totalSteps += log.value;
    if (challenge.type === "calories") totalCalories += log.value;
    if (challenge.type === "active") totalActiveMinutes += log.value;
  }

  const daily = await DailyActivity.findOne({ user: userId, date: today });

  if (daily) {
    totalSteps += daily.steps || 0;
    totalCalories += daily.calories || 0;
    totalActiveMinutes += daily.workoutMinutes || 0;
  }

  const permanentUnlocked = [];
  const dailyUnlocked = [];

  for (const badge of BADGES) {
    let unlock = false;

    switch (badge.key) {
      case "first_challenge": {
        const hasAnyActivity = await ActivityLog.exists({ user: userId });
        unlock = !!hasAnyActivity && !(user.badges || []).includes(badge.key);
        if (unlock) {
          permanentUnlocked.push(badge.key);
        }
        break;
      }

      case "steps_10k_day":
        if (totalSteps >= 10000) dailyUnlocked.push(badge.key);
        break;

      case "calorie_crusher":
        if (totalCalories >= 500) dailyUnlocked.push(badge.key);
        break;

      case "streak_7":
        if (user.streak >= 7 && !(user.badges || []).includes(badge.key)) {
          permanentUnlocked.push(badge.key);
        }
        break;

      case "streak_30":
        if (user.streak >= 30 && !(user.badges || []).includes(badge.key)) {
          permanentUnlocked.push(badge.key);
        }
        break;

      // case "marathon_runner": {
      //   const completed = await UserChallenge.exists({
      //     user: userId,
      //     completed: true,
      //   });
      //   if (completed && !(user.badges || []).includes(badge.key)) {
      //     permanentUnlocked.push(badge.key);
      //   }
      //   break;
      // }
      case "marathon_runner": {
  const completedOnce = await ActivityLog.exists({
    user: userId,
  });
  if (completedOnce && !(user.badges || []).includes(badge.key)) {
    permanentUnlocked.push(badge.key);
  }
  break;
}


      case "early_bird": {
        const early = activityLogs.some(
          (l) => new Date(l.createdAt).getHours() < 8
        );
        if (early) dailyUnlocked.push(badge.key);
        break;
      }

      case "night_owl": {
        const night = activityLogs.some(
          (l) => new Date(l.createdAt).getHours() >= 22
        );
        if (night) dailyUnlocked.push(badge.key);
        break;
      }
    }
  }

  // Save ONLY permanent badges to user
  if (permanentUnlocked.length > 0) {
    user.badges.push(...permanentUnlocked);
    user.badges = [...new Set(user.badges)];
    await user.save();
  }

  // DO NOT save daily badges to database - they are computed only

  return {
    permanentUnlocked,
    dailyUnlocked,
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

    await DailyActivity.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $inc: { workoutMinutes: value } },
      { upsert: true }
    );

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

export { logActivity, logSteps };
