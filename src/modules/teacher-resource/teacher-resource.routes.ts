import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { upload } from "../../middlewares/upload";

import {
  createTeacherResourceController,
  getTeacherResourcesController,
  getTeacherResourceByIdController,
  updateTeacherResourceController,
  deleteTeacherResourceController,
  uploadTeacherResourceController,
} from "./teacher-resource.controller";

const router = Router();

router.post(
  "/upload",
  auth("TEACHER"),
  upload.single("file"),
  uploadTeacherResourceController,
);

router.post("/", auth("TEACHER"), createTeacherResourceController);

router.get("/", auth("TEACHER"), getTeacherResourcesController);

router.get("/:id", auth("TEACHER"), getTeacherResourceByIdController);

router.patch("/:id", auth("TEACHER"), updateTeacherResourceController);

router.delete("/:id", auth("TEACHER"), deleteTeacherResourceController);

export default router;
