import { sendEmail } from "../../services/email/email.service";

export const sendContactMessage = async (payload: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  await sendEmail(
    process.env.EMAIL_USER as string,
    `New Contact Form Submission - ${payload.name}`,
    `
      <h2>New Contact Message</h2>

      <p><strong>Name:</strong> ${payload.name}</p>

      <p><strong>Email:</strong> ${payload.email}</p>

      <p><strong>Phone:</strong> ${payload.phone || "Not Provided"}</p>

      <p><strong>Message:</strong></p>

      <p>${payload.message}</p>
    `,
  );

  return {
    message: "Message sent successfully",
  };
};
