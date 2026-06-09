import { Router } from "express";

import {
  createChapterController,
  getAllChaptersController,
  getChapterByIdController,
  updateChapterController,
  deleteChapterController,
} from "./chapter.controller";

const router = Router();

router.post("/", createChapterController);

router.get("/", getAllChaptersController);

router.get("/:id", getChapterByIdController);

router.patch("/:id", updateChapterController);

router.delete("/:id", deleteChapterController);

export default router;