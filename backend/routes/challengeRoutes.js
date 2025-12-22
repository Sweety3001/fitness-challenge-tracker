import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import UserChallenge from "../models/UserChallenge.js";
import Challenge from "../models/Challenge.js";
import ActivityLog from "../models/ActivityLog.js";
/**
 * GET all available challenges (Add Challenge page)
 */
router.get("/", async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
});

/**
 * JOIN challenges (no duplicates)
 */
router.post("/join", protect, async (req, res) => {
  try {
    const { challengeIds } = req.body;

    if (!Array.isArray(challengeIds) || challengeIds.length === 0) {
      return res.status(400).json({ message: "No challenges selected" });
    }

    const objectIds = challengeIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const existing = await UserChallenge.find({
      user: req.user._id,
      challenge: { $in: objectIds },
    });

    const existingIds = existing.map((e) => e.challenge.toString());

    const newEntries = objectIds
      .filter((id) => !existingIds.includes(id.toString()))
      .map((id) => ({
        user: req.user._id,
        challenge: id,
        // progress: 0,
        isPinned: false,
        startDate: new Date(),
      }));

    if (newEntries.length === 0) {
      return res.json({ message: "Already added" });
    }

    await UserChallenge.insertMany(newEntries);

    res.json({ success: true });
  } catch (err) {
    console.error("JOIN ERROR:", err);
    res.status(500).json({ message: "Failed to join challenges" });
  }
});

/**
 * GET user's challenges (Dashboard)
 */
router.get("/my", protect, async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const userChallenges = await UserChallenge.find({
    user: req.user._id,
  }).populate("challenge");

  const result = [];

  for (const uc of userChallenges) {
    if (!uc.challenge) continue;

    // ✅ ONLY TODAY LOGS
    const logs = await ActivityLog.find({
      user: req.user._id,
      challenge: uc.challenge._id,
      date: today,
    });

    const todayTotal = logs.reduce((sum, l) => sum + l.value, 0);

    const target = uc.challenge.defaultGoal || 0;
    const progress =
      target > 0
        ? Math.min(Math.round((todayTotal / target) * 100), 100)
        : 0;

    result.push({
      _id: uc._id,
      challenge: uc.challenge,
      startDate: uc.startDate,
      isPinned: uc.isPinned,
      active: uc.active,
      progress,        // ✅ computed
      todayValue: todayTotal,
    });
  }

  res.json(result);
});


/**
 * REMOVE a challenge
 */
router.delete("/:id", protect, async (req, res) => {
  await UserChallenge.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  res.json({ success: true });
});

export default router;