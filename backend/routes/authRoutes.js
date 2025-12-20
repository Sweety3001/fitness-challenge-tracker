const express = require("express");
// import express from "express";
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const generateToken = require("../utils/generateToken");

// login
router.get("/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// signup
router.get("/google/signup",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
