import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/messageController";
import { authenticateUser } from "../middlewares/authenticateUser";

const router = Router();

router.use(authenticateUser);
router.route("/:id").get(getMessages);
router.route("/send/:id").post(sendMessage);

export default router;
