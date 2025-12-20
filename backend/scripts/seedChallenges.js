const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"), // 🔥 IMPORTANT
});

const mongoose = require("mongoose");
const Challenge = require("../models/Challenge");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected for seeding"))
  .catch(err => {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  });

const challenges = [
  { title: "Daily Steps", type: "steps", unit: "steps", defaultGoal: 8000, category: "auto" },
  { title: "Calories Burned", type: "calories", unit: "kcal", defaultGoal: 500, category: "auto" },
  { title: "Active Minutes", type: "active", unit: "min", defaultGoal: 30, category: "auto" },

  { title: "Yoga", type: "yoga", unit: "min", defaultGoal: 30, category: "manual" },
  { title: "Meditation", type: "meditation", unit: "min", defaultGoal: 10, category: "manual" },
  { title: "Stretching", type: "stretch", unit: "min", defaultGoal: 15, category: "manual" },

  { title: "Running", type: "running", unit: "km", defaultGoal: 5, category: "manual" },
  { title: "Cycling", type: "cycling", unit: "km", defaultGoal: 10, category: "manual" },

  { title: "Push-ups", type: "pushups", unit: "reps", defaultGoal: 50, category: "manual" },
  { title: "Squats", type: "squats", unit: "reps", defaultGoal: 60, category: "manual" },
  { title: "Plank", type: "plank", unit: "sec", defaultGoal: 90, category: "manual" },
];

(async () => {
  try {
    await Challenge.deleteMany();
    await Challenge.insertMany(challenges);
    console.log("✅ Challenges seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
})();
