import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticateUser";
import { getUserConversations } from "../controllers/conversationController";

const router = Router();

router.use(authenticateUser);
router.route("/").get(getUserConversations);

export default router;
