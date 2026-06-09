import { Request, Response } from "express";
import { getTeacherDashboard, getAdminDashboard, getStudentDashboard } from "./dashboard.service";
import { catchAsync } from "../../utils/catchAsync";

export const getTeacherDashboardController = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await getTeacherDashboard(user.id);

    res.json({
      success: true,
      data: result,
    });
  },
);

export const getAdminDashboardController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAdminDashboard();

    res.json({
      success: true,
      data: result,
    });
  },
);

export const getStudentDashboardController = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await getStudentDashboard(user.id);

    res.json({
      success: true,
      data: result,
    });
  },
);
