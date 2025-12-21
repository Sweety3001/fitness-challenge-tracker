import mongoose from "mongoose";
const activityLogSchema = new mongoose.Schema(
  {
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
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: String, // ✅ YYYY-MM-DD (IMPORTANT)
      required: true,
    },
  },
  { timestamps: true }
);
const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;
