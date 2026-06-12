import { Request, Response } from "express";
import { sendEmail } from "../../services/email/email.service";

export const testEmailController = async (req: Request, res: Response) => {
  try {
    await sendEmail(req.body.email, "NBCA Test Email", "<h1>Brevo Test</h1>");

    res.json({
      success: true,
      message: "Email sent",
    });
  } catch (error: any) {
    console.error("FULL EMAIL ERROR");
    console.error(error);
    console.error(error?.code);
    console.error(error?.response);
    console.error(error?.message);

    throw error;
  }
};
