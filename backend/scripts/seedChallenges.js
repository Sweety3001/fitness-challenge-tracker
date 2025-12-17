require("dotenv").config();
const mongoose = require("mongoose");
const Challenge = require("../models/Challenge");

mongoose.connect(process.env.MONGO_URI);

const challenges = [
  { title: "Yoga", type: "yoga", unit: "minutes", defaultGoal: 30 },
  { title: "Running", type: "running", unit: "km", defaultGoal: 5 },
  { title: "Steps", type: "steps", unit: "steps", defaultGoal: 8000 },
  { title: "Strength Training", type: "strength", unit: "minutes", defaultGoal: 40 },
];

(async () => {
  await Challenge.deleteMany();
  await Challenge.insertMany(challenges);
  console.log("✅ Challenges seeded");
  process.exit();
})();
