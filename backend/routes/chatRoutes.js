import express from "express";
import { chatReply } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatReply);

export default router;
