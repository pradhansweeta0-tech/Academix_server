import { Request, Response } from "express";
import { sendEmail } from "../../services/email/email.service";

export const testEmailController = async (req: Request, res: Response) => {
  await sendEmail(
    req.body.email,
    "NBCA Test Email",
    `
      <h1>NBCA Email Working 🚀</h1>
      <p>Your email service is configured correctly.</p>
      `,
  );

  res.json({
    success: true,
    message: "Email sent",
  });
};
