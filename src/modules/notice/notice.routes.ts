import { Router } from "express";
import { auth } from "../../middlewares/auth";

import {
  createNoticeController,
  getAllNoticesController,
  getNoticeByIdController,
  updateNoticeController,
  deleteNoticeController,
} from "./notice.controller";

const router = Router();

router.post("/", auth("ADMIN", "TEACHER"), createNoticeController);

router.get("/", getAllNoticesController);

router.get("/:id", getNoticeByIdController);

router.patch("/:id", auth("ADMIN", "TEACHER"), updateNoticeController);

router.delete("/:id", auth("ADMIN"), deleteNoticeController);

export default router;
