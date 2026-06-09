import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  attemptTestController,
  getMyAttemptsController,
  getTestAttemptsController,
} from "./test-attempt.controller";

const router = Router();

router.post("/:testId", auth("STUDENT"), attemptTestController);

router.get("/my", auth("STUDENT"), getMyAttemptsController);

router.get("/test/:testId", auth("TEACHER"), getTestAttemptsController);

export default router;
