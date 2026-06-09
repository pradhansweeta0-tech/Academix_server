import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  createLiveClassController,
  getLiveClassesController,
  getLiveClassByIdController,
  updateLiveClassController,
  deleteLiveClassController,
  getUpcomingClassesController,
  getStudentLiveClassesController,
  joinLiveClassController,
  getLiveClassAttendanceController,
  getLiveClassStatsController,
} from "./live-class.controller";

const router = Router();

router.post("/", auth("TEACHER"), createLiveClassController);

router.get("/", auth("TEACHER"), getLiveClassesController);

router.get("/upcoming", auth("STUDENT"), getUpcomingClassesController);

router.get("/student", auth("STUDENT"), getStudentLiveClassesController);

router.get("/stats", auth("TEACHER"), getLiveClassStatsController);

router.get("/join/:id", auth("STUDENT"), joinLiveClassController);

router.get(
  "/:id/attendance",
  auth("TEACHER"),
  getLiveClassAttendanceController,
);

router.get("/:id", auth("TEACHER"), getLiveClassByIdController);

router.patch("/:id", auth("TEACHER"), updateLiveClassController);

router.delete("/:id", auth("TEACHER"), deleteLiveClassController);

export default router;
