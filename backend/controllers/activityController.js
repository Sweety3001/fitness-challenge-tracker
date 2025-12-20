const ActivityLog = require("../models/ActivityLog");
const UserChallenge = require("../models/UserChallenge");

// ✅ helper
const getToday = () => new Date().toISOString().split("T")[0];

/**
 * ✅ LOG ACTIVITY (manual challenges)
 */
const logActivity = async (req, res) => {
  try {
    const { challengeId, value } = req.body;
    const today = getToday();

    if (!challengeId || !value) {
      return res.status(400).json({ message: "Missing data" });
    }

    // ❌ Prevent multiple logs per day (non-steps)
    const existing = await ActivityLog.findOne({
      user: req.user._id,
      challenge: challengeId,
      date: today,
    });

    if (existing) {
      return res.status(400).json({ message: "Already logged for today" });
    }

    await ActivityLog.create({
      user: req.user._id,
      challenge: challengeId,
      value,
      date: today,
    });

    await UserChallenge.findOneAndUpdate(
      { user: req.user._id, challenge: challengeId },
      { $inc: { progress: value } }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("LOG ACTIVITY ERROR:", err);
    res.status(500).json({ message: "Failed to log activity" });
  }
};

/**
 * ✅ STEPS LOGGING (can be added multiple times a day)
 */
const logSteps = async (req, res) => {
  try {
    const { challengeId, steps } = req.body;
    const today = getToday();

    if (!steps || steps <= 0) {
      return res.status(400).json({ message: "Invalid steps value" });
    }

    let log = await ActivityLog.findOne({
      user: req.user._id,
      challenge: challengeId,
      date: today,
    });

    if (log) {
      log.value += steps;
      await log.save();
    } else {
      log = await ActivityLog.create({
        user: req.user._id,
        challenge: challengeId,
        value: steps,
        date: today,
      });
    }

    res.json({
      message: "Steps logged successfully",
      totalStepsToday: log.value,
    });
  } catch (err) {
    console.error("LOG STEPS ERROR:", err);
    res.status(500).json({ message: "Failed to log steps" });
  }
};

module.exports = {
  logActivity,
  logSteps
};
