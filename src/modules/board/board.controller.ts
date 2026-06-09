import { Request, Response } from "express";
import { createBoard, getAllBoards } from "./board.service";

export const createBoardController = async (
  req: Request,
  res: Response
) => {
  const result = await createBoard(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllBoardsController = async (
  req: Request,
  res: Response
) => {
  const result = await getAllBoards();

  res.json({
    success: true,
    data: result,
  });
};