import { Request, Response } from "express";

import { AuthRequest } from "../../middlewares/auth";

import { getStudentResources } from "./resource.service";

import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "./resource.service";

export const createResourceController = async (req: Request, res: Response) => {
  const result = await createResource(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllResourcesController = async (
  req: Request,
  res: Response,
) => {
  const result = await getAllResources();

  res.json({
    success: true,
    data: result,
  });
};

export const getResourceByIdController = async (
  req: Request,
  res: Response,
) => {
  const result = await getResourceById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateResourceController = async (req: Request, res: Response) => {
  const result = await updateResource(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteResourceController = async (req: Request, res: Response) => {
  const result = await deleteResource(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const getStudentResourcesController = async (
  req: Request,
  res: Response
) => {
  const result = await getStudentResources(
    (req as any).user.id
  );

  res.json({
    success: true,
    data: result,
  });
};
