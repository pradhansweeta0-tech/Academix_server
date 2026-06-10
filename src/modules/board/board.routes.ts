import { Router } from "express";

import {
  createBoardController,
  getAllBoardsController,
  getBoardByIdController,
  updateBoardController,
  deleteBoardController,
} from "./board.controller";

const router = Router();

router.post("/", createBoardController);

router.get("/", getAllBoardsController);

router.get("/:id", getBoardByIdController);

router.patch("/:id", updateBoardController);

router.delete("/:id", deleteBoardController);

export default router;
