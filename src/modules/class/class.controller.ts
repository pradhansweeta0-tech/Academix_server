import { Request, Response } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "./class.service";

export const createClassController = async (req: Request, res: Response) => {
  const result = await createClass(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllClassesController = async (req: Request, res: Response) => {
  const result = await getAllClasses();

  res.json({
    success: true,
    data: result,
  });
};

export const getClassByIdController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await getClassById(
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
};

export const updateClassController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await updateClass(
        req.params.id as string,
        req.body
      );

    res.json({
      success: true,
      data: result,
    });
};

export const deleteClassController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await deleteClass(
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
};