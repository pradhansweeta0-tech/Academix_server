import { Request, Response } from "express";

import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "./admin.service";

export const createAdminController = async (req: Request, res: Response) => {
  const result = await createAdmin(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllAdminsController = async (req: Request, res: Response) => {
  const result = await getAllAdmins();

  res.json({
    success: true,
    data: result,
  });
};

export const getAdminByIdController = async (req: Request, res: Response) => {
  const result = await getAdminById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateAdminController = async (req: Request, res: Response) => {
  const result = await updateAdmin(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteAdminController = async (req: Request, res: Response) => {
  const result = await deleteAdmin(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};
