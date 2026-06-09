"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.studentSignupController = exports.studentLoginController = exports.teacherLoginController = exports.adminLoginController = void 0;
const auth_service_1 = require("./auth.service");
const adminLoginController = async (req, res) => {
    const result = await (0, auth_service_1.adminLogin)(req.body.email, req.body.password);
    res.json({
        success: true,
        data: result,
    });
};
exports.adminLoginController = adminLoginController;
const teacherLoginController = async (req, res) => {
    const result = await (0, auth_service_1.teacherLogin)(req.body.email, req.body.password);
    res.json({
        success: true,
        data: result,
    });
};
exports.teacherLoginController = teacherLoginController;
const studentLoginController = async (req, res) => {
    const result = await (0, auth_service_1.studentLogin)(req.body.studentId, req.body.password);
    res.json({
        success: true,
        data: result,
    });
};
exports.studentLoginController = studentLoginController;
const studentSignupController = async (req, res) => {
    const result = await (0, auth_service_1.studentSignup)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.studentSignupController = studentSignupController;
const resetPasswordController = async (req, res) => {
    const result = await (0, auth_service_1.resetPassword)(req.body.email, req.body.password);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.resetPasswordController = resetPasswordController;
