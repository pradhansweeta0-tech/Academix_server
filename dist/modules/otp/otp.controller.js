"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPController = exports.sendOTPController = void 0;
const otp_service_1 = require("./otp.service");
const sendOTPController = async (req, res) => {
    await (0, otp_service_1.createOTP)(req.body.email, req.body.type);
    res.status(200).json({
        success: true,
        message: "OTP sent successfully",
    });
};
exports.sendOTPController = sendOTPController;
const verifyOTPController = async (req, res) => {
    const result = await (0, otp_service_1.verifyOTP)(req.body.email, req.body.otp, req.body.type);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.verifyOTPController = verifyOTPController;
