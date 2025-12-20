const mongoose = require("mongoose");

const dailyActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    steps: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      default: 0,
    },
    workoutMinutes: {
      type: Number,
      default: 0,
    },
    activeMinutes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Ensure one record per user per day
dailyActivitySchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyActivity", dailyActivitySchema);
