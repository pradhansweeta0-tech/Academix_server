import { Request, Response } from "express";
import {
  createSubject,
  getAllSubjects,
} from "./subject.service";

export const createSubjectController = async (
  req: Request,
  res: Response
) => {
  const result = await createSubject(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllSubjectsController = async (
  req: Request,
  res: Response
) => {
  const result = await getAllSubjects();

  res.json({
    success: true,
    data: result,
  });
};