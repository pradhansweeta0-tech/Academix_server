import { Request, Response } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "./student.service";

export const createStudentController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await createStudent(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  };

export const getAllStudentsController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await getAllStudents();

    res.json({
      success: true,
      data: result,
    });
  };

export const getStudentByIdController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await getStudentById(
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const updateStudentController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await updateStudent(
        req.params.id as string,
        req.body
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const deleteStudentController =
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await deleteStudent(
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
  };