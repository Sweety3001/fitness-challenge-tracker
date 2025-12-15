const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  tokenHash: String,
  expiresAt: Date,
  revoked: { type: Boolean, default: false }
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
