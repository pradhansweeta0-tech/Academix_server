import { Request, Response } from "express";

import {
  assignTeacherToStudent,
} from "./student-teacher.service";

export const assignTeacherToStudentController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await assignTeacherToStudent(
        req.params.studentId as string,
        req.body.teacherId
      );

    res.json({
      success: true,
      data: result,
    });
  };