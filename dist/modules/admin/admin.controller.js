"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminController = exports.updateAdminController = exports.getAdminByIdController = exports.getAllAdminsController = exports.createAdminController = void 0;
const admin_service_1 = require("./admin.service");
const createAdminController = async (req, res) => {
    const result = await (0, admin_service_1.createAdmin)(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createAdminController = createAdminController;
const getAllAdminsController = async (req, res) => {
    const result = await (0, admin_service_1.getAllAdmins)();
    res.json({
        success: true,
        data: result,
    });
};
exports.getAllAdminsController = getAllAdminsController;
const getAdminByIdController = async (req, res) => {
    const result = await (0, admin_service_1.getAdminById)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getAdminByIdController = getAdminByIdController;
const updateAdminController = async (req, res) => {
    const result = await (0, admin_service_1.updateAdmin)(req.params.id, req.body);
    res.json({
        success: true,
        data: result,
    });
};
exports.updateAdminController = updateAdminController;
const deleteAdminController = async (req, res) => {
    const result = await (0, admin_service_1.deleteAdmin)(req.params.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.deleteAdminController = deleteAdminController;
