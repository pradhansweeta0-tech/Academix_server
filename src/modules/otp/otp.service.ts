import { prisma } from "../../config/prisma";
import { sendEmail } from "../../services/email/email.service";
import { otpEmailTemplate } from "../../services/email/templates/otp.template";
import { forgotPasswordTemplate } from "../../services/email/templates/forgot-password.template";
import { OTP_TYPES } from "../../constants/otp";

export const createOTP = async (email: string, type: string) => {
  try {
    console.log("========== CREATE OTP START ==========");
    console.log("Email:", email);
    console.log("Type:", type);

    console.log("Step 1: Checking existing OTP...");
    const existingOTP = await prisma.oTP.findFirst({
      where: {
        email,
        type,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("✅ Step 1 Completed");

    if (existingOTP) {
      const diff = Date.now() - existingOTP.createdAt.getTime();

      if (diff < 60 * 1000) {
        throw new Error("Please wait 60 seconds before requesting another OTP");
      }
    }

    console.log("Step 2: Generating OTP...");
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log("✅ Step 2 Completed");

    console.log("Step 3: Deleting old OTP...");
    await prisma.oTP.deleteMany({
      where: {
        email,
      },
    });

    console.log("✅ Step 3 Completed");

    console.log("Step 4: Saving OTP...");
    const otpRecord = await prisma.oTP.create({
      data: {
        email,
        otp,
        type,
        expiresAt,
      },
    });

    console.log("✅ Step 4 Completed");

    console.log("Step 5: Sending Email...");

    if (type === OTP_TYPES.SIGNUP) {
      await sendEmail(
        email,
        "NBCA Email Verification",
        otpEmailTemplate(otp)
      );
    }

    if (type === OTP_TYPES.FORGOT_PASSWORD) {
      await sendEmail(
        email,
        "NBCA Password Reset",
        forgotPasswordTemplate(otp)
      );
    }

    console.log("✅ Step 5 Completed");
    console.log("========== OTP CREATED ==========");

    return otpRecord;
  } catch (error) {
    console.error("❌ CREATE OTP ERROR");
    console.error(error);
    throw error;
  }
};

export const verifyOTP = async (
  email: string,
  otp: string,
  type: string
) => {
  try {
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
  } catch (error) {
    console.error("❌ VERIFY OTP ERROR");
    console.error(error);
    throw error;
  }
};