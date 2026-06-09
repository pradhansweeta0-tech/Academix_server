import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/s3";

import {
  createTeacherResource,
  getTeacherResources,
  getTeacherResourceById,
  updateTeacherResource,
  deleteTeacherResource,
} from "./teacher-resource.service";

export const createTeacherResourceController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await createTeacherResource(
        user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      data: result,
    });
  };

export const getTeacherResourcesController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await getTeacherResources(
        user.id
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const getTeacherResourceByIdController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await getTeacherResourceById(
        user.id,
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const updateTeacherResourceController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await updateTeacherResource(
        user.id,
        req.params.id as string,
        req.body
      );

    res.json({
      success: true,
      data: result,
    });
  };

export const deleteTeacherResourceController =
  async (
    req: Request,
    res: Response
  ) => {

    const user = (req as any).user;

    const result =
      await deleteTeacherResource(
        user.id,
        req.params.id as string
      );

    res.json({
      success: true,
      data: result,
    });
  };

  export const uploadTeacherResourceController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const user = (req as any).user;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket:
            process.env.AWS_BUCKET_NAME,

          Key: fileName,

          Body: req.file.buffer,

          ContentType:
            req.file.mimetype,
        })
      );

      const fileUrl =
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      const result =
        await createTeacherResource(
          user.id,
          {
            title: req.body.title,

            type: req.body.type,

            contentId:
              req.body.contentId,

            fileUrl,

            fileSize:
              req.file.size,
          }
        );

      res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: "Upload failed",
      });
    }
  };