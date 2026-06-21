import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (...roles: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token =
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Access Denied",
        });
      }

      (req as any).user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
  };
};

export interface AuthRequest extends Request {
  user: {
    id: string;
    role: string;
    email?: string;
    studentId?: string;
  };
}