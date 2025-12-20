const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET, // ✅ FIX
    { expiresIn: "15m" }
  );
};

module.exports = generateToken;
