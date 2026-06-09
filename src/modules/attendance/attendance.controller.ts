import { Request, Response } from "express";

import {
  createAttendance,
  getAttendance,
  getMyAttendance,
} from "./attendance.service";

export const createAttendanceController = async (
  req: Request,
  res: Response,
) => {
  const user = (req as any).user;

  const result = await createAttendance(user.id, req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAttendanceController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await getAttendance(user.id);

  res.json({
    success: true,
    data: result,
  });
};

export const getMyAttendanceController = async (
  req: Request,
  res: Response,
) => {
  const user = (req as any).user;

  const result = await getMyAttendance(user.id);

  res.json({
    success: true,
    data: result,
  });
};
