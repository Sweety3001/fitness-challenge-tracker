
// import dotenv from "dotenv";
// // 🔹 Load env FIRST
// // dotenv.config({ path: path.join(__dirname, ".env") });
// // dotenv.config();
// import path from "path";
// import { fileURLToPath } from "url";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import passport from "passport";

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import challengeRoutes from "./routes/challengeRoutes.js";
// import activityRoutes from "./routes/activityRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
// // 🔹 Resolve dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// dotenv.config({ path: path.join(__dirname, ".env") });
// // 🔹 PROOF
// console.log("ENV LOADED:", process.env.GOOGLE_CLIENT_ID);
// console.log("ALL ENV KEYS:", Object.keys(process.env));
// console.log("GROQ KEY:", process.env.GROQ_API_KEY);
// // 🔹 LOAD PASSPORT AFTER ENV (CRITICAL FIX)
// await import("./config/passport.js");

// const app = express();

// // 🔹 CORE MIDDLEWARE
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());
// app.use(passport.initialize());

// // 🔹 DB
// connectDB();

// // 🔹 ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/challenges", challengeRoutes);
// app.use("/api/activity", activityRoutes);
// app.use("/api/chat", chatRoutes);
// // 🔹 STATIC
// app.use("/uploads", express.static("uploads"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// 🔥 1️⃣ LOAD ENV FIRST — NOTHING ABOVE THIS
import dotenv from "dotenv";
dotenv.config();



// 🔥 2️⃣ NOW IMPORT EVERYTHING ELSE
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// 🔥 3️⃣ LOAD PASSPORT AFTER ENV
await import("./config/passport.js");

const app = express();

// 🔹 MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// 🔹 DB
connectDB();

// 🔹 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/chat", chatRoutes);

// 🔹 STATIC
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
