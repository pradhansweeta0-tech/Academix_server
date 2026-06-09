import { Router } from "express";

import {
  createAcademicSessionController,
  getAllAcademicSessionsController,
  getAcademicSessionByIdController,
  updateAcademicSessionController,
  deleteAcademicSessionController,
} from "./academic-session.controller";

const router = Router();

router.post("/", createAcademicSessionController);

router.get("/", getAllAcademicSessionsController);

router.get("/:id", getAcademicSessionByIdController);

router.patch("/:id", updateAcademicSessionController);

router.delete("/:id", deleteAcademicSessionController);

export default router;