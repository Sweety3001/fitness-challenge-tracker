import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";

router.get("/me", protect, userController.getProfile);
router.patch("/me", protect, userController.updateProfile);

export default router;