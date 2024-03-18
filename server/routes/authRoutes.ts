import { Router } from "express";
import { getCurrentUser, login, logout, register } from "../controllers/authController";
import { authenticateUser } from "../middlewares/authenticateUser";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getcurrentuser").get(authenticateUser, getCurrentUser);

export default router;
