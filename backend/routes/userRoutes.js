import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";
import { updateProfile } from "../controllers/userController.js";
router.get("/me", protect, userController.getProfile);
// router.patch("/me", protect, userController.updateProfile);
router.patch("/me", protect, updateProfile);
export default router;