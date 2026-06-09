import { Router } from "express";

import {
  createClassController,
  getAllClassesController,
} from "./class.controller";

const router = Router();

router.post("/", createClassController);
router.get("/", getAllClassesController);

export default router;