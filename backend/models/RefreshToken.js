import mongoose from "mongoose";
const refreshTokenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  tokenHash: String,
  expiresAt: Date,
  revoked: { type: Boolean, default: false }
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
