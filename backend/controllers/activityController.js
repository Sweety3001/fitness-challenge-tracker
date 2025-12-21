import ActivityLog from "../models/ActivityLog.js";
import UserChallenge from "../models/UserChallenge.js";
import DailyActivity from "../models/DailyActivity.js";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

const getToday = () => new Date().toISOString().split("T")[0];

const logActivity = async (req, res) => {
  try {
    const { challengeId, value } = req.body;
    const today = getToday();

    if (!value || value <= 0) {
      return res.status(400).json({ message: "Invalid value" });
    }

    /* =========================
       CASE 1: DAILY METRICS
       (steps, calories, activeMinutes)
    ========================= */
    if (!challengeId) {
      const daily = await DailyActivity.findOneAndUpdate(
        { user: req.user._id, date: today },
        { $inc: { steps: value } }, // or calories / activeMinutes
        { upsert: true, new: true }
      );

      return res.json({
        success: true,
        daily,
      });
    }

    /* =========================
       CASE 2: CHALLENGE LOG
    ========================= */
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // accumulate daily challenge log
    let log = await ActivityLog.findOne({
      user: req.user._id,
      challenge: challengeId,
      date: today,
    });

    if (log) {
      log.value += value;
      await log.save();
    } else {
      log = await ActivityLog.create({
        user: req.user._id,
        challenge: challengeId,
        value,
        date: today,
      });
    }

    // update challenge progress
    await UserChallenge.findOneAndUpdate(
      { user: req.user._id, challenge: challengeId },
      { $inc: { progress: value } }
    );

    // optional: update daily snapshot
    await DailyActivity.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $inc: { workoutMinutes: value } },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("LOG ACTIVITY ERROR:", err);
    res.status(500).json({ message: "Failed to log activity" });
  }
};

const logSteps = async (req, res) => {
  try {
    const { challengeId, steps } = req.body;
    const today = getToday();

    if (!steps || steps <= 0) {
      return res.status(400).json({ message: "Invalid steps value" });
    }

    // Update daily steps in DailyActivity
    const daily = await DailyActivity.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $inc: { steps: steps } },
      { upsert: true, new: true }
    );

    // Check for "10K Steps Day" achievement
    if (daily.steps >= 10000) {
      // Fetch user to check if they already have this badge
      const user = await User.findById(req.user._id);
      
      // Only award badge if user doesn't already have it
      if (!user.badges.includes("10K Steps Day")) {
        user.badges.push("10K Steps Day");
        await user.save();
      }
    }

    // If there's a challengeId, also update the challenge progress
    if (challengeId) {
      // update challenge progress
      await UserChallenge.findOneAndUpdate(
        { user: req.user._id, challenge: challengeId },
        { $inc: { progress: steps } }
      );

      // Also log as activity for the challenge
      let log = await ActivityLog.findOne({
        user: req.user._id,
        challenge: challengeId,
        date: today,
      });

      if (log) {
        log.value += steps;
        await log.save();
      } else {
        const challenge = await Challenge.findById(challengeId);
        if (challenge) {
          await ActivityLog.create({
            user: req.user._id,
            challenge: challengeId,
            value: steps,
            date: today,
          });
        }
      }
    }

    // Update daily snapshot
    await DailyActivity.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $inc: { workoutMinutes: Math.floor(steps / 20) } }, // Approximate conversion
      { upsert: true }
    );

    res.json({ success: true, daily });
  } catch (err) {
    console.error("LOG STEPS ERROR:", err);
    res.status(500).json({ message: "Failed to log steps" });
  }
};

export { logActivity, logSteps };