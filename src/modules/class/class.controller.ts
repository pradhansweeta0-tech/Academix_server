import { Request, Response } from "express";
import { createClass, getAllClasses } from "./class.service";

export const createClassController = async (
  req: Request,
  res: Response
) => {
  const result = await createClass(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllClassesController = async (
  req: Request,
  res: Response
) => {
  const result = await getAllClasses();

  res.json({
    success: true,
    data: result,
  });
};