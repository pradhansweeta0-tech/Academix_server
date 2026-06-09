import { ZodObject } from "zod";
import {
  Request,
  Response,
  NextFunction,
} from "express";

export const validateRequest =
  (schema: ZodObject<any>) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.errors,
      });
    }
  };