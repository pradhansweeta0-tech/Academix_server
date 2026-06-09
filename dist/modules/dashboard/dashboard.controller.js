"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentDashboardController = exports.getAdminDashboardController = exports.getTeacherDashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
const catchAsync_1 = require("../../utils/catchAsync");
exports.getTeacherDashboardController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const result = await (0, dashboard_service_1.getTeacherDashboard)(user.id);
    res.json({
        success: true,
        data: result,
    });
});
exports.getAdminDashboardController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await (0, dashboard_service_1.getAdminDashboard)();
    res.json({
        success: true,
        data: result,
    });
});
exports.getStudentDashboardController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const result = await (0, dashboard_service_1.getStudentDashboard)(user.id);
    res.json({
        success: true,
        data: result,
    });
});
