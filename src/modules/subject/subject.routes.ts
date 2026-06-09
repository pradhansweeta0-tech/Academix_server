import { Router } from "express";

import {
  createSubjectController,
  getAllSubjectsController,
} from "./subject.controller";

const router = Router();

router.post("/", createSubjectController);
router.get("/", getAllSubjectsController);

export default router;