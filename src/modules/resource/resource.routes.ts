import { Router } from "express";

import {
  createResourceController,
  getAllResourcesController,
  getResourceByIdController,
  updateResourceController,
  deleteResourceController,
} from "./resource.controller";

import { upload } from "../../middlewares/upload";

import { uploadResource } from "./resource.upload.controller";

const router = Router();

router.post("/", createResourceController);

router.get("/", getAllResourcesController);

router.get("/:id", getResourceByIdController);

router.patch("/:id", updateResourceController);

router.delete("/:id", deleteResourceController);

router.post("/upload", upload.single("file"), uploadResource);

export default router;
