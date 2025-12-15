const User = require("../models/User");
const { awardXP } = require("../utils/xpUtils");
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { age, gender, fitnessLevel, goals } = req.body;

    const user = await User.findById(req.user.id);

    const firstTimeProfile = !user.profileCompleted;

    user.age = age;
    user.gender = gender;
    user.fitnessLevel = fitnessLevel;
    user.goals = goals;
    user.profileCompleted = true;

    // 🎯 XP for completing profile (FIRST TIME ONLY)
    if (firstTimeProfile) {
      awardXP(user, 300);
    }

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};
