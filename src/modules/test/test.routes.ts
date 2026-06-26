import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  createTestController,
  getTestsController,
  getTestByIdController,
  updateTestController,
  deleteTestController,
  getStudentTestsController,
  getStudentTestByIdController,
} from "./test.controller";

const router = Router();

router.post("/", auth("TEACHER"), createTestController);

router.get("/", auth("TEACHER"), getTestsController);

router.get("/student", auth("STUDENT"), getStudentTestsController);

router.get("/student/:id", auth("STUDENT"), getStudentTestByIdController);

router.get("/:id", auth("TEACHER"), getTestByIdController);

router.patch("/:id", auth("TEACHER"), updateTestController);

router.delete("/:id", auth("TEACHER"), deleteTestController);

export default router;
