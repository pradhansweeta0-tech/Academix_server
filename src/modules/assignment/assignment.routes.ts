import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  createAssignmentController,
  getAssignmentsController,
  getAssignmentByIdController,
  updateAssignmentController,
  deleteAssignmentController,
  getStudentAssignmentsController,
  getStudentAssignmentsControllerById,
} from "./assignment.controller";

const router = Router();

router.post("/", auth("TEACHER"), createAssignmentController);

router.get("/", auth("TEACHER"), getAssignmentsController);

router.get("/student", auth("STUDENT"), getStudentAssignmentsController);

router.get(
  "/student/:id",
  auth("STUDENT"),
  getStudentAssignmentsControllerById,
);

router.get("/teacher/:id", auth("TEACHER"), getAssignmentByIdController);

router.patch("/:id", auth("TEACHER"), updateAssignmentController);

router.delete("/:id", auth("TEACHER"), deleteAssignmentController);

export default router;
