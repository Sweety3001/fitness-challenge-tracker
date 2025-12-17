const mongoose = require("mongoose");

const userChallengeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
  },
  startDate: Date,
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("UserChallenge", userChallengeSchema);
