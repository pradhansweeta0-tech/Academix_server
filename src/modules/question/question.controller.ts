import { Request, Response } from "express";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/s3";

import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "./question.service";

export const createQuestionController = async (req: Request, res: Response) => {
  const result = await createQuestion(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getQuestionsController = async (req: Request, res: Response) => {
  const result = await getQuestions(req.params.testId as string);

  res.json({
    success: true,
    data: result,
  });
};

export const getQuestionByIdController = async (
  req: Request,
  res: Response,
) => {
  const result = await getQuestionById(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const updateQuestionController = async (req: Request, res: Response) => {
  const result = await updateQuestion(req.params.id as string, req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const deleteQuestionController = async (req: Request, res: Response) => {
  const result = await deleteQuestion(req.params.id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const uploadQuestionImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,

        Key: fileName,

        Body: req.file.buffer,

        ContentType: req.file.mimetype,
      }),
    );

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    res.status(201).json({
      success: true,
      data: {
        fileUrl,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};
