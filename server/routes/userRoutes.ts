import { Router } from "express";
import {
  getContacts,
  getUser,
  updateUser,
  uploadImage,
} from "../controllers/userController";
import { authenticateUser } from "../middlewares/authenticateUser";

const router = Router();

router.use(authenticateUser);
router.route("/").get(getContacts);
router.route("/:id").get(getUser);
router.route("/:id/edit").patch(updateUser);
router.route("/upload").post(uploadImage);

export default router;
