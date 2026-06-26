import { Request, Response } from "express";

import {
  createTest,
  getTests,
  getTestById,
  updateTest,
  deleteTest,
  getStudentTests,
  getStudentTestById,
} from "./test.service";

import { AuthRequest } from "../../middlewares/auth";

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

export const getStudentTestsController = async (
  req: Request,
  res: Response
) => {
  try {
    const tests = await getStudentTests((req as any).user.id);

    res.status(200).json({
      success: true,
      message: "Student tests fetched successfully",
      data: tests,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentTestByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const test = await getStudentTestById((req as any).user.id, req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Student test fetched successfully",
      data: test,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
