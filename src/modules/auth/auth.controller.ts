import { Request, Response } from "express";
import {
  adminLogin,
  teacherLogin,
  studentLogin,
  studentSignup,
  resetPassword,
} from "./auth.service";

export const adminLoginController = async (req: Request, res: Response) => {
  const result = await adminLogin(req.body.email, req.body.password);

  res.json({
    success: true,
    data: result,
  });
};

export const teacherLoginController = async (req: Request, res: Response) => {
  const result = await teacherLogin(req.body.email, req.body.password);

  res.json({
    success: true,
    data: result,
  });
};

export const studentLoginController = async (req: Request, res: Response) => {
  const result = await studentLogin(req.body.studentId, req.body.password);

  res.json({
    success: true,
    data: result,
  });
};

export const studentSignupController = async (req: Request, res: Response) => {
  const result = await studentSignup(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const resetPasswordController =
  async (
    req: Request,
    res: Response
  ) => {

    const result =
      await resetPassword(
        req.body.email,
        req.body.password
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  