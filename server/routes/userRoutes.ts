import { Router } from "express";
import { getContacts, getUser } from "../controllers/userController";
import { authenticateUser } from "../middlewares/authenticateUser";

const router = Router();

router.use(authenticateUser);
router.route("/").get(getContacts);
router.route("/:id").get(getUser);

export default router;
