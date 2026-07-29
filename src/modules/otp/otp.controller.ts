import { Request, Response } from "express";
import { createOTP, verifyOTP } from "./otp.service";

export const sendOTPController = async (req: Request, res: Response) => {
  try {
    console.log("========== OTP REQUEST ==========");
    console.log(req.body);

    const result = await createOTP(req.body.email, req.body.type);

    console.log("OTP CREATED");

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("OTP CONTROLLER ERROR");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const result = await verifyOTP(
      req.body.email,
      req.body.otp,
      req.body.type
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};