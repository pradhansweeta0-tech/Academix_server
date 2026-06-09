import { Request, Response } from "express";

import {
  createTest,
  getTests,
  getTestById,
  updateTest,
  deleteTest,
} from "./test.service";

export const createTestController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await createTest(user.id, req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getTestsController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await getTests(user.id);

  res.json({
    success: true,
    data: result,
  });
};

export const getTestByIdController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await getTestById(user.id, req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateTestController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await updateTest(user.id, req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteTestController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await deleteTest(user.id, req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};
