import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  getTeacherDashboardController,
  getAdminDashboardController,
  getStudentDashboardController,
} from "./dashboard.controller";

const router = Router();

router.get("/teacher", auth("TEACHER"), getTeacherDashboardController);
router.get("/admin", auth("ADMIN"), getAdminDashboardController);
router.get("/student", auth("STUDENT"), getStudentDashboardController);

export default router;
