import { Request, Response } from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "./subject.service";

export const createSubjectController = async (req: Request, res: Response) => {
  const result = await createSubject(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllSubjectsController = async (req: Request, res: Response) => {
  const result = await getAllSubjects();

  res.json({
    success: true,
    data: result,
  });
};

export const getSubjectByIdController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await getSubjectById(
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
};

export const updateSubjectController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await updateSubject(
        req.params.id as string,
        req.body
      );

    res.json({
      success: true,
      data: result,
    });
};

export const deleteSubjectController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await deleteSubject(
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
};