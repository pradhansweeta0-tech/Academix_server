import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  family: 4, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify(
  (error, success) => {
    if (error) {
      console.error(error);
    } else {
      console.log(
        "SMTP Ready"
      );
    }
  }
);

export const sendEmail = async (to: string, subject: string, html: string) => {
  return transporter.sendMail({
    from: `"NBCA" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
