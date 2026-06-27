import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  attemptTestController,
  getMyAttemptsController,
  getTestAttemptsController,
  getStudentTestResultController,
} from "./test-attempt.controller";

const router = Router();

router.post("/:testId", auth("STUDENT"), attemptTestController);

router.get("/my", auth("STUDENT"), getMyAttemptsController);

router.get("/test/:testId", auth("TEACHER"), getTestAttemptsController);

router.get("/result/:testId", auth("STUDENT"), getStudentTestResultController);

export default router;
