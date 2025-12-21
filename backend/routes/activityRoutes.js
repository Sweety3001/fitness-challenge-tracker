import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import ActivityLog from "../models/ActivityLog.js";
import UserChallenge from "../models/UserChallenge.js";
import User from "../models/User.js";
import DailyActivity from "../models/DailyActivity.js";
import Challenge from "../models/Challenge.js";
import { logActivity, logSteps } from "../controllers/activityController.js";

/**
 * ===============================
 * LOG ACTIVITY
 * ===============================
 */
router.post("/log", protect, logActivity);       // non-steps
router.post("/steps", protect, logSteps);        // steps-specific

/**
 * ===============================
 * TODAY SNAPSHOT
 * ===============================
 */
router.get("/today", protect, async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const daily = await DailyActivity.findOne({
      user: req.user._id,
      date: today,
    });

    // If no activity yet today, return zeros
    if (!daily) {
      return res.json({
        steps: 0,
        calories: 0,
        workoutTime: 0,
        activeMinutes: 0,
        streak: 0, // will be handled later
      });
    }

    res.json({
      steps: daily.steps,
      calories: daily.calories,
      workoutTime: daily.workoutMinutes,
      activeMinutes: daily.activeMinutes,
      streak: 0, // placeholder (we'll fix streak next)
    });
  } catch (err) {
    console.error("TODAY SNAPSHOT ERROR:", err);
    res.status(500).json({ message: "Failed to fetch today snapshot" });
  }
});

/**
 * ===============================
 * WEEKLY ACTIVITY
 * ===============================
 */
router.get("/weekly", protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 6);

    // Get all challenges the user has joined
    const userChallenges = await UserChallenge.find({
      user: req.user._id
    }).populate('challenge');

    // Get activity logs for the past week
    const logs = await ActivityLog.find({
      user: req.user._id,
      date: {
        $gte: startDate.toISOString().split("T")[0],
        $lte: today.toISOString().split("T")[0],
      },
    }).populate('challenge');

    // Get daily activity records (for steps data)
    const dailyRecords = await DailyActivity.find({
      user: req.user._id,
      date: {
        $gte: startDate.toISOString().split("T")[0],
        $lte: today.toISOString().split("T")[0],
      },
    });

    // Create a map of challenges by ID
    const challengeMap = {};
    userChallenges.forEach(uc => {
      if (uc.challenge) {
        challengeMap[uc.challenge._id.toString()] = {
          title: uc.challenge.title,
          unit: uc.challenge.unit,
          type: uc.challenge.type,
          data: {}
        };
      }
    });

    // Initialize data for each day for each challenge
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toISOString().split("T")[0];
      days.push({
        date: dayStr,
        day: d.toLocaleDateString("en-US", { weekday: "short" })
      });
      
      // Initialize challenge data for this day
      Object.keys(challengeMap).forEach(challengeId => {
        challengeMap[challengeId].data[dayStr] = 0;
      });
    }

    // Aggregate activity logs by challenge and day
    logs.forEach(log => {
      const challengeId = log.challenge._id.toString();
      if (challengeMap[challengeId]) {
        challengeMap[challengeId].data[log.date] = 
          (challengeMap[challengeId].data[log.date] || 0) + log.value;
      }
    });

    // Add steps data separately
    const stepsData = {};
    dailyRecords.forEach(record => {
      stepsData[record.date] = record.steps || 0;
    });

    // Prepare the response data
    const weeklyData = days.map(({ date, day }) => {
      const result = { day };
      
      // Add data for each challenge
      Object.keys(challengeMap).forEach(challengeId => {
        const challenge = challengeMap[challengeId];
        result[challenge.title] = challenge.data[date] || 0;
      });
      
      // Add steps data
      result['Steps'] = stepsData[date] || 0;
      
      return result;
    });

    res.json(weeklyData);
  } catch (err) {
    console.error("WEEKLY ACTIVITY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch weekly activity" });
  }
});


/**
 * ===============================
 * STREAK
 * ===============================
 */
router.get("/streak", protect, async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user._id });

    if (!logs.length) {
      return res.json({ streak: 0, badges: [] });
    }

    const logDays = new Set(logs.map(log => log.date));

    let streak = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);

    while (true) {
      const dayKey = current.toISOString().split("T")[0];
      if (logDays.has(dayKey)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    const user = await User.findById(req.user._id);

    if (streak >= 7 && !user.badges.includes("7-Day Streak")) {
      user.badges.push("7-Day Streak");
    }
    if (streak >= 30 && !user.badges.includes("30-Day Streak")) {
      user.badges.push("30-Day Streak");
    }

    await user.save();

    res.json({ streak, badges: user.badges });
  } catch (err) {
    console.error("STREAK ERROR:", err);
    res.status(500).json({ message: "Failed to calculate streak" });
  }
});

/**
 * ===============================
 * CHALLENGE DETAILS + GRAPH
 * ===============================
 */
router.get("/challenge/:userChallengeId", protect, async (req, res) => {
  try {
    const { userChallengeId } = req.params;

    const uc = await UserChallenge.findOne({
      _id: userChallengeId,
      user: req.user._id,
    }).populate("challenge");

    if (!uc) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    const start = new Date();
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    const logs = await ActivityLog.find({
      user: req.user._id,
      challenge: uc.challenge._id,
      date: { $gte: start.toISOString().split("T")[0] },
    });

    const dailyMap = {};
    logs.forEach(log => {
      dailyMap[log.date] = (dailyMap[log.date] || 0) + log.value;
    });

    const graph = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];

      graph.push({
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        value: dailyMap[key] || 0,
      });
    }

    res.json({
      challenge: {
        title: uc.challenge.title,
        unit: uc.challenge.unit,
        goal: uc.challenge.defaultGoal,
      },
      progress: uc.progress,
      logs,
      graph,
    });
  } catch (err) {
    console.error("CHALLENGE DETAILS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch challenge details" });
  }
});

export default router;