import express from "express";
import passport from "passport";
import authController from "../controllers/authController.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// 🔹 Google login
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 Google signup
router.get(
  "/google/signup",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// 🔹 Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    );
  }
);

// 🔹 Email / password auth
router.post("/signup", authController.signup);
router.post("/login", authController.login);

export default router;
