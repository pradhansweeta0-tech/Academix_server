import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/s3";
import { prisma } from "../../config/prisma";

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

export const uploadQuestionsExcelController = async (
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

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet);

    const questions = (data as any[]).map((row) => ({
      question: row.question,

      optionA: row.optionA,
      optionB: row.optionB,
      optionC: row.optionC,
      optionD: row.optionD,

      correctAnswer: row.correctAnswer,

      marks: Number(row.marks) || 1,

      difficulty: row.difficulty || "EASY",

      explanation: row.explanation || "",

      testId: req.body.testId,
    }));

    console.log("BODY:", req.body);
    
    await prisma.question.createMany({
      data: questions,
    });

    return res.status(201).json({
      success: true,
      message: `${questions.length} questions imported`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Excel upload failed",
    });
  }
};
