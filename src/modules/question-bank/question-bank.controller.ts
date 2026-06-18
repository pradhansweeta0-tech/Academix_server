import { Request, Response } from "express";

import {
  createQuestionBank,
  getQuestionBanks,
  getQuestionBankById,
  updateQuestionBank,
  deleteQuestionBank,
} from "./question-bank.service";

export const createQuestionBankController = async (
  req: Request,
  res: Response,
) => {
  const user = (req as any).user;

  const result = await createQuestionBank(user.id, req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getQuestionBanksController = async (
  req: Request,
  res: Response,
) => {
  const user = (req as any).user;

  const result = await getQuestionBanks(user.id);

  res.json({
    success: true,
    data: result,
  });
};

export const getQuestionBankByIdController = async (
  req: Request,
  res: Response,
) => {
  const result = await getQuestionBankById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateQuestionBankController = async (
  req: Request,
  res: Response,
) => {
  const result = await updateQuestionBank(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteQuestionBankController = async (
  req: Request,
  res: Response,
) => {
  const result = await deleteQuestionBank(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};
