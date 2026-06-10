import { Request, Response } from "express";
import {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "./board.service";

export const createBoardController = async (req: Request, res: Response) => {
  const result = await createBoard(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllBoardsController = async (req: Request, res: Response) => {
  const result = await getAllBoards();

  res.json({
    success: true,
    data: result,
  });
};

export const getBoardByIdController = async (req: Request, res: Response) => {
  const result = await getBoardById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateBoardController = async (req: Request, res: Response) => {
  const result = await updateBoard(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteBoardController = async (req: Request, res: Response) => {
  const result = await deleteBoard(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};
