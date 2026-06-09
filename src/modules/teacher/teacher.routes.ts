import { Router } from "express";
import { auth } from "../../middlewares/auth";
import {
  createTeacherController,
  getAllTeachersController,
  getTeacherByIdController,
  updateTeacherController,
  deleteTeacherController,
} from "./teacher.controller";

import { validateRequest } from "../../middlewares/validateRequest";

import { createTeacherSchema } from "./teacher.validation";

import { assignSubjectsToTeacherController } from "./teacher-assignment.controller";
import { assignClassesToTeacherController } from "./teacher-class.controller";

const router = Router();

router.post(
  "/",
  auth("ADMIN"),
  validateRequest(createTeacherSchema),
  createTeacherController,
);

router.get("/", auth("ADMIN"), getAllTeachersController);
router.post("/:teacherId/classes", assignClassesToTeacherController);
router.post("/:teacherId/subjects", assignSubjectsToTeacherController);

router.get("/:id", getTeacherByIdController);

router.patch("/:id", updateTeacherController);

router.delete("/:id", deleteTeacherController);

export default router;
