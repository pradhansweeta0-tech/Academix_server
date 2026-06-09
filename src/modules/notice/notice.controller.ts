import { Request, Response } from "express";

import {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} from "./notice.service";

export const createNoticeController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await createNotice(user, req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllNoticesController = async (req: Request, res: Response) => {
  const result = await getAllNotices();

  res.json({
    success: true,
    data: result,
  });
};

export const getNoticeByIdController = async (req: Request, res: Response) => {
  const result = await getNoticeById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateNoticeController = async (req: Request, res: Response) => {
  const result = await updateNotice(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteNoticeController = async (req: Request, res: Response) => {
  const result = await deleteNotice(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};
