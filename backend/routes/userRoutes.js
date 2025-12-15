const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/me", protect, userController.getProfile);
router.patch("/me", protect, userController.updateProfile);

module.exports = router;
