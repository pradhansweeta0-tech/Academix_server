import { Request, Response } from "express";

import {
  attemptTest,
  getMyAttempts,
  getTestAttempts,
  getStudentTestResult,
} from "./test-attempt.service";

export const attemptTestController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await attemptTest(
    user.id,
    req.params.testId as string,
    req.body.answers,
  );

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getMyAttemptsController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await getMyAttempts(user.id);

  res.json({
    success: true,
    data: result,
  });
};

export const getTestAttemptsController = async (
  req: Request,
  res: Response,
) => {
  const result = await getTestAttempts(req.params.testId as string);

  res.json({
    success: true,
    data: result,
  });
};

export const getStudentTestResultController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await getStudentTestResult(
      (req as any).user.id,
      req.params.testId as string,
    );

    res.status(200).json({
      success: true,
      message: "Result fetched successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
