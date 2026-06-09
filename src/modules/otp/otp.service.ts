import { prisma } from "../../config/prisma";
import { sendEmail } from "../../services/email/email.service";
import { otpEmailTemplate } from "../../services/email/templates/otp.template";
import { forgotPasswordTemplate } from "../../services/email/templates/forgot-password.template";
import { OTP_TYPES } from "../../constants/otp";

export const createOTP = async (email: string, type: string) => {
  const existingOTP = await prisma.oTP.findFirst({
    where: {
      email,
      type,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  if (existingOTP) {
    const diff = Date.now() - existingOTP.createdAt.getTime();

    if (diff < 60 * 1000) {
      throw new Error("Please wait 60 seconds before requesting another OTP");
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.oTP.deleteMany({
    where: {
      email,
    },
  });

  const otpRecord = await prisma.oTP.create({
    data: {
      email,
      otp,
      type,
      expiresAt,
    },
  });

  if (type === OTP_TYPES.SIGNUP) {
    await sendEmail(email, "NBCA Email Verification", otpEmailTemplate(otp));
  }

  if (type === OTP_TYPES.FORGOT_PASSWORD) {
    await sendEmail(email, "NBCA Password Reset", forgotPasswordTemplate(otp));
  }
  return otpRecord;
};

export const verifyOTP = async (email: string, otp: string, type: string) => {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email,
      otp,
      type,
    },
  });

  if (!otpRecord) {
    throw new Error("Invalid OTP");
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new Error("OTP Expired");
  }

  const updatedOTP = await prisma.oTP.update({
    where: {
      id: otpRecord.id,
    },

    data: {
      verified: true,
    },
  });

  return updatedOTP;
};
