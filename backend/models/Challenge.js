const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Yoga, Running, Steps
    type: {
      type: String,
      enum: ["yoga", "running", "steps", "strength", "meditation"],
      required: true,
    },
    unit: String, // steps, minutes, calories
    defaultGoal: Number,
    icon: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);
