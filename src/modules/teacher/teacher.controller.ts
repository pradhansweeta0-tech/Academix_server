import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "./teacher.service";

export const createTeacherController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createTeacher(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  },
);

export const getAllTeachersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllTeachers();

    res.json({
      success: true,
      data: result,
    });
  },
);

export const getTeacherByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getTeacherById(req.params.id as string);

    res.json({
      success: true,
      data: result,
    });
  },
);

export const updateTeacherController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await updateTeacher(req.params.id as string, req.body);

    res.json({
      success: true,
      data: result,
    });
  },
);

export const deleteTeacherController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await deleteTeacher(req.params.id as string);

    res.json({
      success: true,
      data: result,
    });
  },
);
