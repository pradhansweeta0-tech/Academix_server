import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  createQuestionController,
  getQuestionsController,
  getQuestionByIdController,
  updateQuestionController,
  deleteQuestionController,
} from "./question.controller";

const router = Router();

router.post("/", auth("TEACHER"), createQuestionController);

router.get("/test/:testId", auth("TEACHER"), getQuestionsController);

router.get("/:id", auth("TEACHER"), getQuestionByIdController);

router.patch("/:id", auth("TEACHER"), updateQuestionController);

router.delete("/:id", auth("TEACHER"), deleteQuestionController);

export default router;
