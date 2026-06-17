import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { upload } from "../../middlewares/upload";

import {
  createQuestionController,
  getQuestionsController,
  getQuestionByIdController,
  updateQuestionController,
  deleteQuestionController,
  uploadQuestionImageController,
} from "./question.controller";

const router = Router();

router.post("/", auth("TEACHER"), createQuestionController);

router.post(
  "/upload",
  auth("TEACHER"),
  upload.single("file"),
  uploadQuestionImageController,
);

router.get("/test/:testId", auth("TEACHER"), getQuestionsController);

router.get("/:id", auth("TEACHER"), getQuestionByIdController);

router.patch("/:id", auth("TEACHER"), updateQuestionController);

router.delete("/:id", auth("TEACHER"), deleteQuestionController);

export default router;
