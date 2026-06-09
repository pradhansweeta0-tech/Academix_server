import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3 } from "../../config/s3";
import { prisma } from "../../config/prisma";

export const uploadResource = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, type, contentId } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const fileName =
      `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const fileUrl =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    const resource =
      await prisma.resource.create({
        data: {
          title,
          type,
          fileUrl,
          fileSize: req.file.size,
          contentId,
        },
      });

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};