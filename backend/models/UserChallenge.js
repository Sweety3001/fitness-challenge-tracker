import mongoose from "mongoose";
const userChallengeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  startDate: { type: Date, default: Date.now },
  // progress: { type: Number, default: 0 },
  // completed: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  // lastUpdated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const UserChallenge = mongoose.model("UserChallenge", userChallengeSchema);
export default UserChallenge;