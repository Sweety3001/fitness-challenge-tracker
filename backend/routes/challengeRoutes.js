const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const UserChallenge = require("../models/UserChallenge");
const Challenge = require("../models/Challenge");

router.get("/", async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
});

router.post("/join", protect, async (req, res) => {
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  try {
    const { challengeIds } = req.body;

    if (!Array.isArray(challengeIds) || challengeIds.length === 0) {
      return res.status(400).json({ message: "No challenges selected" });
    }

    const entries = challengeIds.map((id) => ({
      user: req.user._id,
      challenge: id,
      startDate: new Date(),
    }));

    await UserChallenge.insertMany(entries);

    res.json({ success: true });
  } catch (err) {
    console.error("JOIN ERROR:", err);
    res.status(500).json({ message: "Failed to join challenges" });
  }
});
// ✅ GET logged-in user's joined challenges
router.get("/my", protect, async (req, res) => {
  try {
    const userChallenges = await UserChallenge.find({
      user: req.user._id,
    }).populate("challenge");

    res.json(userChallenges);
  } catch (err) {
    console.error("FETCH MY CHALLENGES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch user challenges" });
  }
});


module.exports = router;
