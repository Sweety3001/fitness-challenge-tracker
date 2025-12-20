require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const connectDB = require("./config/db");
require("./config/passport"); // ⬅️ passport strategy first

const app = express();

// 🔹 CORE MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 🔹 PASSPORT INIT (BEFORE ROUTES)
app.use(passport.initialize());

// 🔹 DATABASE
connectDB();

// 🔹 ROUTES (AFTER passport init)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));

// 🔹 STATIC
app.use("/uploads", express.static("uploads"));
app.use("/api/activity", require("./routes/activityRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
