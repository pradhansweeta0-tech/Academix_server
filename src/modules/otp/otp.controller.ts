import { Request, Response } from "express";

import { createOTP, verifyOTP } from "./otp.service";

export const sendOTPController = async (req: Request, res: Response) => {
  await createOTP(req.body.email, req.body.type);

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
};

export const verifyOTPController = async (req: Request, res: Response) => {
  const result = await verifyOTP(req.body.email, req.body.otp, req.body.type);

  res.status(200).json({
    success: true,
    data: result,
  });
};
