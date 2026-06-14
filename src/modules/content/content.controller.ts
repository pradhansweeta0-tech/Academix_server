import { Request, Response } from "express";

import {
  createContent,
  getAllContents,
  getContentById,
  updateContent,
  deleteContent,
  getContentsByChapter,
} from "./content.service";

export const createContentController = async (req: Request, res: Response) => {
  const result = await createContent(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllContentsController = async (req: Request, res: Response) => {
  const result = await getAllContents();

  res.json({
    success: true,
    data: result,
  });
};

export const getContentByIdController = async (req: Request, res: Response) => {
  const result = await getContentById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateContentController = async (req: Request, res: Response) => {
  const result = await updateContent(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteContentController = async (req: Request, res: Response) => {
  const result = await deleteContent(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const getContentsByChapterController = async (
  req: Request,
  res: Response,
) => {
  const result = await getContentsByChapter(req.params.chapterId as string);

  res.json({
    success: true,
    data: result,
  });
};
