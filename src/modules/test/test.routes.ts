import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  createTestController,
  getTestsController,
  getTestByIdController,
  updateTestController,
  deleteTestController,
} from "./test.controller";

const router = Router();

router.post("/", auth("TEACHER"), createTestController);

router.get("/", auth("TEACHER"), getTestsController);

router.get("/:id", auth("TEACHER"), getTestByIdController);

router.patch("/:id", auth("TEACHER"), updateTestController);

router.delete("/:id", auth("TEACHER"), deleteTestController);

export default router;
