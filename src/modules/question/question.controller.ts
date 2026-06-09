import { Request, Response } from "express";

import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "./question.service";

export const createQuestionController = async (req: Request, res: Response) => {
  const result = await createQuestion(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getQuestionsController = async (req: Request, res: Response) => {
  const result = await getQuestions(req.params.testId as string);

  res.json({
    success: true,
    data: result,
  });
};

export const getQuestionByIdController = async (
  req: Request,
  res: Response,
) => {
  const result = await getQuestionById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateQuestionController = async (req: Request, res: Response) => {
  const result = await updateQuestion(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteQuestionController = async (req: Request, res: Response) => {
  const result = await deleteQuestion(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};
