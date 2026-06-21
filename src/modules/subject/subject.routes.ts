import { Router } from "express";

import {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
  getStudentSubjectsController,
} from "./subject.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", createSubjectController);
router.get("/", getAllSubjectsController);
router.get("/student", auth("STUDENT"), getStudentSubjectsController);
router.get("/:id", getSubjectByIdController);
router.patch("/:id", updateSubjectController);
router.delete("/:id", deleteSubjectController);

export default router;
