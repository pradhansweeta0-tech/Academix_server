import { Router } from "express";

import {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
} from "./subject.controller";

const router = Router();

router.post("/", createSubjectController);
router.get("/", getAllSubjectsController);
router.get("/:id", getSubjectByIdController);
router.patch("/:id", updateSubjectController);
router.delete("/:id", deleteSubjectController);

export default router;
