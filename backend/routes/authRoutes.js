const express = require("express");
// import express from "express";
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // Create JWT
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
