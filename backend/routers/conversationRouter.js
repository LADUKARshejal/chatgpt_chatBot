import express from "express";
import { newConversation, continueConversation } from "../controllers/conversationController.js";

const router = express.Router();

router.post("/conversation", newConversation);

router.put("/conversation/:id", continueConversation);

export default router;