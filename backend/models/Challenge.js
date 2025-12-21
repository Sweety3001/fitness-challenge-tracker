import mongoose from "mongoose";
const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // steps, calories, yoga
  unit: { type: String, required: true }, // steps, min, kcal
  defaultGoal: { type: Number, required: true },
  category: {
    type: String,
    enum: ["auto", "manual"],
    required: true,
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
