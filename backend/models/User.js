import mongoose from "mongoose";
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
badges: {
  type: [String],
  default: []
},
streak: {
  type: Number,
  default: 0,
},
lastActiveDate:{
  type: Date,
},
  avatar: {
    type: String,
    default:"/avatars/default.png"
  },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;