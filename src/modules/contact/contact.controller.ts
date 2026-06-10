import { Request, Response } from "express";
import { sendContactMessage } from "./contact.service";

export const sendContactMessageController = async (
  req: Request,
  res: Response
) => {
  const result = await sendContactMessage(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};