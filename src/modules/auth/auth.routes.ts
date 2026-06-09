import { Router } from "express";
import {
  adminLoginController,
  teacherLoginController,
  studentLoginController,
  studentSignupController,
  resetPasswordController,
} from "./auth.controller";

const router = Router();

router.post("/admin/login", adminLoginController);
router.post("/teacher/login", teacherLoginController);
router.post("/student/login", studentLoginController);
router.post("/student-signup", studentSignupController);
router.post("/reset-password", resetPasswordController);

export default router;
