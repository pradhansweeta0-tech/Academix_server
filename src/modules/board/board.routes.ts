import { Router } from "express";

import {
  createBoardController,
  getAllBoardsController,
} from "./board.controller";

const router = Router();

router.post("/", createBoardController);

router.get("/", getAllBoardsController);

export default router;