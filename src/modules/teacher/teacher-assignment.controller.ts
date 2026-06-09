import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {
  assignSubjectsToTeacher,
} from "./teacher-assignment.service";

export const assignSubjectsToTeacherController = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await assignSubjectsToTeacher(
        req.params.teacherId as string,
        req.body.subjectIds
      );

    res.json({
      success: true,
      data: result,
    });
  }, );