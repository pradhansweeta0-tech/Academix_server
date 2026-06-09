import { Request, Response } from "express";
import {
  getMyProfile,
  updateMyProfile,
  getStudentIdCard,
  verifyStudentCard,
} from "./profile.service";
import { generateStudentIdCard } from "./id-card.service";
export const getMyProfileController = async (req: Request, res: Response) => {
  const result = await getMyProfile((req as any).user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const updateMyProfileController = async (
  req: Request,
  res: Response,
) => {
  const result = await updateMyProfile((req as any).user.id, req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const getStudentIdCardController = async (
  req: Request,
  res: Response,
) => {
  const result = await getStudentIdCard((req as any).user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const downloadStudentIdCardController = async (
  req: Request,
  res: Response,
) => {
  const pdf = await generateStudentIdCard((req as any).user.id);

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=student-id-card.pdf",
  );

  res.send(pdf);
};

export const verifyStudentCardController = async (
  req: Request,
  res: Response,
) => {
  const result = await verifyStudentCard(req.params.studentId as string);

  res.status(200).json({
    success: true,
    data: result,
  });
};
