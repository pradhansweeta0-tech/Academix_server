import { Request, Response } from "express";

import {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapter,
  deleteChapter,
} from "./chapter.service";

export const createChapterController = async (
  req: Request,
  res: Response
) => {
  const result = await createChapter(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllChaptersController = async (
  req: Request,
  res: Response
) => {
  const result = await getAllChapters();

  res.json({
    success: true,
    data: result,
  });
};

export const getChapterByIdController = async (
  req: Request,
  res: Response
) => {
  const result = await getChapterById(
    req.params.id as string
  );

  res.json({
    success: true,
    data: result,
  });
};

export const updateChapterController = async (
  req: Request,
  res: Response
) => {
  const result = await updateChapter(
    req.params.id as string,
    req.body
  );

  res.json({
    success: true,
    data: result,
  });
};

export const deleteChapterController = async (
  req: Request,
  res: Response
) => {
  const result = await deleteChapter(
    req.params.id as string
  );

  res.json({
    success: true,
    data: result,
  });
};