import { Request, Response } from "express";

import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "./assignment.service";

export const createAssignmentController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await createAssignment(
        user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      data: result,
    });
  };

export const getAssignmentsController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await getAssignments(
        user.id
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const getAssignmentByIdController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await getAssignmentById(
        user.id,
        req.params.id as string,
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const updateAssignmentController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await updateAssignment(
        user.id,
        req.params.id as string,
        req.body
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const deleteAssignmentController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await deleteAssignment(
        user.id,
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
  };