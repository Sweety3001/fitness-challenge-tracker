const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,

  age: Number,
  gender: String,
  fitnessLevel: String,
  goals: [String],

  profileCompleted: {
    type: Boolean,
    default: false
  },

  xp: {
  type: Number,
  default: 0,
},
level: {
  type: Number,
  default: 1,
},
badges: [
  {
    type: String,
  },
],

}, { timestamps: true });



module.exports = mongoose.model("User", userSchema);
