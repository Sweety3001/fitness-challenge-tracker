const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

/* ===================== SIGNUP ===================== */
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashed,
      name,
      isProfileComplete: false, // ⭐ IMPORTANT
    });

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    await RefreshToken.create({
      userId: user._id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // 🔴 keep false for localhost
      sameSite: "lax",
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* ===================== LOGIN ===================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    await RefreshToken.create({
      userId: user._id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

/* ===================== GOOGLE OAUTH ===================== */
exports.googleAuthSuccess = async (req, res) => {
  try {
    const user = req.user;

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    // ⭐ SEND PROFILE STATUS
    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${accessToken}&profileComplete=${user.isProfileComplete}`
    );
  } catch (err) {
    console.error(err);
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  }
};
