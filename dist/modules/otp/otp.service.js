"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.createOTP = void 0;
const prisma_1 = require("../../config/prisma");
const email_service_1 = require("../../services/email/email.service");
const otp_template_1 = require("../../services/email/templates/otp.template");
const forgot_password_template_1 = require("../../services/email/templates/forgot-password.template");
const otp_1 = require("../../constants/otp");
const createOTP = async (email, type) => {
    const existingOTP = await prisma_1.prisma.oTP.findFirst({
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
    await prisma_1.prisma.oTP.deleteMany({
        where: {
            email,
        },
    });
    const otpRecord = await prisma_1.prisma.oTP.create({
        data: {
            email,
            otp,
            type,
            expiresAt,
        },
    });
    if (type === otp_1.OTP_TYPES.SIGNUP) {
        await (0, email_service_1.sendEmail)(email, "NBCA Email Verification", (0, otp_template_1.otpEmailTemplate)(otp));
    }
    if (type === otp_1.OTP_TYPES.FORGOT_PASSWORD) {
        await (0, email_service_1.sendEmail)(email, "NBCA Password Reset", (0, forgot_password_template_1.forgotPasswordTemplate)(otp));
    }
    return otpRecord;
};
exports.createOTP = createOTP;
const verifyOTP = async (email, otp, type) => {
    const otpRecord = await prisma_1.prisma.oTP.findFirst({
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
    const updatedOTP = await prisma_1.prisma.oTP.update({
        where: {
            id: otpRecord.id,
        },
        data: {
            verified: true,
        },
    });
    return updatedOTP;
};
exports.verifyOTP = verifyOTP;
