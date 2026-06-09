import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  createAssignmentController,
  getAssignmentsController,
  getAssignmentByIdController,
  updateAssignmentController,
  deleteAssignmentController,
} from "./assignment.controller";

const router = Router();

router.post(
  "/",
  auth("TEACHER"),
  createAssignmentController
);

router.get(
  "/",
  auth("TEACHER"),
  getAssignmentsController
);

router.get(
  "/:id",
  auth("TEACHER"),
  getAssignmentByIdController
);

router.patch(
  "/:id",
  auth("TEACHER"),
  updateAssignmentController
);

router.delete(
  "/:id",
  auth("TEACHER"),
  deleteAssignmentController
);

export default router;