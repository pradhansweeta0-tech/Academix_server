import { Request, Response } from "express";
import {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
} from "./academic-session.service";

export const createAcademicSessionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await createAcademicSession(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAllAcademicSessionsController = async (
  req: Request,
  res: Response,
) => {
  const result = await getAllAcademicSessions();

  res.json({
    success: true,
    data: result,
  });
};

export const getAcademicSessionByIdController = async (
  req: Request,
  res: Response,
) => {
  const id = req.params.id as string;

  const result = await getAcademicSessionById(id);

  res.json({
    success: true,
    data: result,
  });
};

export const updateAcademicSessionController = async (
  req: Request,
  res: Response
) => {
  const result = await updateAcademicSession(
    req.params.id as string,
    req.body
  );

  res.json({
    success: true,
    data: result,
  });
};

export const deleteAcademicSessionController = async (
  req: Request,
  res: Response
) => {
  const result = await deleteAcademicSession(
    req.params.id as string
  );

  res.json({
    success: true,
    data: result,
  });
};