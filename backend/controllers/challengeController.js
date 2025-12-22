const Challenge = require("../models/Challenge.js");
const UserChallenge = require("../models/UserChallenge.js");

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
        // progress: 0,
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
// exports.getMyChallenges = async (req, res) => {
//   try {
//     const challenges = await UserChallenge.find({
//       user: req.user._id,
//     }).populate("challenge");

//     // 🔥 FILTER OUT BROKEN REFERENCES
//     const validChallenges = challenges.filter(
//       (uc) => uc.challenge !== null
//     );

//     res.json(validChallenges);
//   } catch (err) {
//     console.error("GET MY CHALLENGES ERROR:", err);
//     res.status(500).json({ message: "Failed to fetch challenges" });
//   }
// };

const ActivityLog = require("../models/ActivityLog.js");

// const getToday = () => new Date().toISOString().split("T")[0];

// /**
//  * ✅ DASHBOARD CHALLENGES (DAILY RESET LOGIC)
//  */
// exports.getMyChallenges = async (req, res) => {
//   try {
//     const today = getToday();

//     const userChallenges = await UserChallenge.find({
//       user: req.user._id,
//       active: true,
//     }).populate("challenge");

//     const dashboardChallenges = [];

//     for (const uc of userChallenges) {
//       if (!uc.challenge) continue;

//       let todayValue = 0;

//       if (uc.challenge.type === "steps") {
//         const daily = await DailyActivity.findOne({
//           user: req.user._id,
//           date: today,
//         });
//         todayValue = daily?.steps || 0;

//       } else if (uc.challenge.type === "calories") {
//         const daily = await DailyActivity.findOne({
//           user: req.user._id,
//           date: today,
//         });
//         todayValue = daily?.calories || 0;

//       } else {
//         const logsToday = await ActivityLog.find({
//           user: req.user._id,
//           challenge: uc.challenge._id,
//           date: today,
//         });

//         todayValue = logsToday.reduce((sum, log) => sum + log.value, 0);
//       }

//       const goal = Math.max(uc.challenge.defaultGoal || 1, 1);

//       dashboardChallenges.push({
//         _id: uc._id,
//         challenge: uc.challenge,
//         todayValue,
//         progress: Math.min(
//           Math.round((todayValue / goal) * 100),
//           100
//         ),
//         completedToday: todayValue >= goal,
//         isPinned: uc.isPinned,
//       });
//     }

//     res.json(dashboardChallenges);
//   } catch (err) {
//     console.error("GET MY CHALLENGES ERROR:", err);
//     res.status(500).json({ message: "Failed to fetch challenges" });
//   }
// };



exports.getMyChallenges = async (req, res) => {
  try {
    const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

    const userChallenges = await UserChallenge.find({
      user: req.user._id,
      active: true,
    }).populate("challenge");

    const dashboardChallenges = [];

    for (const uc of userChallenges) {
      if (!uc.challenge) continue;

      // 🔥 FETCH ONLY TODAY'S LOGS
      const logsToday = await ActivityLog.find({
        user: req.user._id,
        challenge: uc.challenge._id,
        date: {
  $gte: startOfToday,
  $lte: endOfToday
},



      });
await ActivityLog.deleteMany({
  user: req.user._id,
  challenge: challengeId
});

      const todayValue = logsToday.reduce(
        (sum, log) => sum + log.value,
        0
      );

      const progress = Math.min(
        Math.round(
          (todayValue / uc.challenge.defaultGoal) * 100
        ),
        100
      );
      const completedToday = todayValue >= uc.challenge.defaultGoal;
      console.log("DASHBOARD DEBUG", {
  challenge: uc.challenge.title,
  today,
  todayValue,
  progress,
  completedToday
});

      dashboardChallenges.push({
        _id: uc._id,
        challenge: uc.challenge,
        todayValue,
        progress,                 // ✅ DAILY ONLY
        completedToday: todayValue >= uc.challenge.defaultGoal,
        isPinned: uc.isPinned,
      });
    }

    res.json(dashboardChallenges);
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
