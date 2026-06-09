import { Router } from "express";

import {
  createContentController,
  getAllContentsController,
  getContentByIdController,
  updateContentController,
  deleteContentController,
} from "./content.controller";

const router = Router();

router.post("/", createContentController);

router.get("/", getAllContentsController);

router.get("/:id", getContentByIdController);

router.patch("/:id", updateContentController);

router.delete("/:id", deleteContentController);

export default router;