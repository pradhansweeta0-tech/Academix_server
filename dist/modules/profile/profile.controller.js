"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStudentCardController = exports.downloadStudentIdCardController = exports.getStudentIdCardController = exports.updateMyProfileController = exports.getMyProfileController = void 0;
const profile_service_1 = require("./profile.service");
const id_card_service_1 = require("./id-card.service");
const getMyProfileController = async (req, res) => {
    const result = await (0, profile_service_1.getMyProfile)(req.user.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.getMyProfileController = getMyProfileController;
const updateMyProfileController = async (req, res) => {
    const result = await (0, profile_service_1.updateMyProfile)(req.user.id, req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.updateMyProfileController = updateMyProfileController;
const getStudentIdCardController = async (req, res) => {
    const result = await (0, profile_service_1.getStudentIdCard)(req.user.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.getStudentIdCardController = getStudentIdCardController;
const downloadStudentIdCardController = async (req, res) => {
    const pdf = await (0, id_card_service_1.generateStudentIdCard)(req.user.id);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=student-id-card.pdf");
    res.send(pdf);
};
exports.downloadStudentIdCardController = downloadStudentIdCardController;
const verifyStudentCardController = async (req, res) => {
    const result = await (0, profile_service_1.verifyStudentCard)(req.params.studentId);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.verifyStudentCardController = verifyStudentCardController;
