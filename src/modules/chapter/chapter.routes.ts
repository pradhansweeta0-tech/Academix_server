import { Router } from "express";

import {
  createChapterController,
  getAllChaptersController,
  getChapterByIdController,
  updateChapterController,
  deleteChapterController,
  getChaptersBySubjectController,
  getStudentChaptersController,
} from "./chapter.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", createChapterController);

router.get("/", getAllChaptersController);
router.get(
  "/student/:subjectId",
  auth("STUDENT"),
  getStudentChaptersController,
);

router.get("/subject/:subjectId", getChaptersBySubjectController);

router.get("/:id", getChapterByIdController);

router.patch("/:id", updateChapterController);

router.delete("/:id", deleteChapterController);

export default router;
