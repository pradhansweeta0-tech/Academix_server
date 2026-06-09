import { Router } from "express";

import {
  createAdminController,
  getAllAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
} from "./admin.controller";

const router = Router();

router.post("/", createAdminController);

router.get("/", getAllAdminsController);

router.get("/:id", getAdminByIdController);

router.patch("/:id", updateAdminController);

router.delete("/:id", deleteAdminController);

export default router;
