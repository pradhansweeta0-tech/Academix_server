import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {
  assignClassesToTeacher,
} from "./teacher-class.service";

export const assignClassesToTeacherController = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await assignClassesToTeacher(
        req.params.teacherId as string,
        req.body.classIds
      );

    res.json({
      success: true,
      data: result,
    });
  },
);