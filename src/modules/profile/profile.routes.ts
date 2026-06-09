import { Router } from "express";
import {
  getMyProfileController,
  updateMyProfileController,
  getStudentIdCardController,
  downloadStudentIdCardController,
  verifyStudentCardController,
} from "./profile.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/me", auth(), getMyProfileController);
router.put("/me", auth(), updateMyProfileController);
router.get("/id-card", auth(), getStudentIdCardController);
router.get("/id-card/pdf", auth(), downloadStudentIdCardController);
router.get("/verify/:studentId", verifyStudentCardController);

export default router;
