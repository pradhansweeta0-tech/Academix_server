import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/s3";
import { prisma } from "../../config/prisma";

export const uploadFile = async (req: Request, res: Response) => {
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

    const savedFile = await prisma.file.create({
      data: {
        fileName: fileName,
        fileUrl: fileUrl,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      },
    });

    res.status(201).json({
      success: true,
      data: savedFile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};
