import { Router } from "express";

import {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} from "./student.controller";
import { assignTeacherToStudentController } from "./student-teacher.controller";

const router = Router();

router.post("/", createStudentController);

router.get("/", getAllStudentsController);

router.post("/:studentId/assign-teacher", assignTeacherToStudentController);

router.get("/:id", getStudentByIdController);

router.patch("/:id", updateStudentController);

router.delete("/:id", deleteStudentController);

export default router;
