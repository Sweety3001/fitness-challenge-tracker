const Challenge = require("../models/Challenge");
const UserChallenge = require("../models/UserChallenge");

/**
 * ✅ JOIN CHALLENGE (PREVENT DUPLICATES)
 */
exports.joinChallenges = async (req, res) => {
  try {
    const { challengeIds } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(challengeIds) || challengeIds.length === 0) {
      return res.status(400).json({ message: "No challenges selected" });
    }

    // Already joined challenges
    const existing = await UserChallenge.find({
      user: userId,
      challenge: { $in: challengeIds },
      active: true,
    });

    const existingIds = existing.map((e) => e.challenge.toString());

    const newEntries = challengeIds
      .filter((id) => !existingIds.includes(id))
      .map((id) => ({
        user: userId,
        challenge: id,
        progress: 0,
        isPinned: false,
        active: true,
        startDate: new Date(),
      }));

    if (newEntries.length === 0) {
      return res.status(400).json({
        message: "Challenges already added",
      });
    }

    await UserChallenge.insertMany(newEntries);

    res.json({ success: true });
  } catch (err) {
    console.error("JOIN ERROR:", err);
    res.status(500).json({ message: "Failed to join challenges" });
  }
};

/**
 * ✅ GET USER CHALLENGES
 */
exports.getMyChallenges = async (req, res) => {
  try {
    const challenges = await UserChallenge.find({
      user: req.user._id,
    }).populate("challenge");

    // 🔥 FILTER OUT BROKEN REFERENCES
    const validChallenges = challenges.filter(
      (uc) => uc.challenge !== null
    );

    res.json(validChallenges);
  } catch (err) {
    console.error("GET MY CHALLENGES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch challenges" });
  }
};


/**
 * ✅ PIN / UNPIN CHALLENGE
 */
exports.togglePin = async (req, res) => {
  try {
    const uc = await UserChallenge.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!uc) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    uc.isPinned = !uc.isPinned;
    await uc.save();

    res.json({ success: true, isPinned: uc.isPinned });
  } catch (err) {
    console.error("PIN ERROR:", err);
    res.status(500).json({ message: "Pin toggle failed" });
  }
};

/**
 * ✅ REMOVE CHALLENGE (SOFT DELETE)
 */
exports.removeChallenge = async (req, res) => {
  try {
    const uc = await UserChallenge.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!uc) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    uc.active = false;
    await uc.save();

    res.json({ success: true });
  } catch (err) {
    console.error("REMOVE ERROR:", err);
    res.status(500).json({ message: "Failed to remove challenge" });
  }
};
