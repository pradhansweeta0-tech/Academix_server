import { Request, Response } from "express";

import {
  attemptTest,
  getMyAttempts,
  getTestAttempts,
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
