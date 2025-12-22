import User from "../models/User.js";
import { awardXP } from "../utils/xpUtils.js";

/* =====================
   GET PROFILE
   ===================== */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* =====================
   UPDATE PROFILE
   ===================== */
// export const updateProfile = async (req, res) => {
//   try {
//     const { age, gender, fitnessLevel, goals } = req.body;

//     const user = await User.findById(req.user.id);

//     const firstTimeProfile = !user.profileCompleted;

//     user.age = age;
//     user.gender = gender;
//     user.fitnessLevel = fitnessLevel;
//     user.goals = goals;
//     user.profileCompleted = true;

//     // 🎯 XP for completing profile (FIRST TIME ONLY)
//     if (firstTimeProfile) {
//       awardXP(user, 300);
//     }

//     await user.save();

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Profile update failed" });
//   }
// };

// import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, age, gender, fitnessLevel } = req.body;

    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age;
    if (gender !== undefined) user.gender = gender;
    if (fitnessLevel !== undefined) user.fitnessLevel = fitnessLevel;

    await user.save();

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        fitnessLevel: user.fitnessLevel,
        xp: user.xp,
        level: user.level,
        badges: user.badges,
      },
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export default {
  getProfile,
  updateProfile,
}