import { Router } from "express";

import {
  createResourceController,
  getAllResourcesController,
  getResourceByIdController,
  updateResourceController,
  deleteResourceController,
  getStudentResourcesController,
} from "./resource.controller";

import { upload } from "../../middlewares/upload";

import { uploadResource } from "./resource.upload.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", createResourceController);

router.get("/", getAllResourcesController);

router.get("/student", auth("STUDENT"), getStudentResourcesController);

router.get("/:id", getResourceByIdController);

router.patch("/:id", updateResourceController);

router.delete("/:id", deleteResourceController);

router.post("/upload", upload.single("file"), uploadResource);

export default router;
