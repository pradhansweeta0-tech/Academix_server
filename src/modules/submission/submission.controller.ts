import { Request, Response } from "express";

import {
  submitAssignment,
  getMySubmissions,
  getAssignmentSubmissions,
  evaluateSubmission,
} from "./submission.service";

export const submitAssignmentController = async (
  req: Request,
  res: Response,
) => {
  const user = (req as any).user;

  const result = await submitAssignment(
    user.id,
    req.params.assignmentId as string,
    req.body,
  );

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getMySubmissionsController = async (
  req: Request,
  res: Response,
) => {
  const user = (req as any).user;

  const result = await getMySubmissions(user.id);

  res.json({
    success: true,
    data: result,
  });
};

export const getAssignmentSubmissionsController = async (
  req: Request,
  res: Response,
) => {
  const result = await getAssignmentSubmissions(req.params.assignmentId as string);

  res.json({
    success: true,
    data: result,
  });
};

export const evaluateSubmissionController = async (
  req: Request,
  res: Response,
) => {
  const result = await evaluateSubmission(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};
