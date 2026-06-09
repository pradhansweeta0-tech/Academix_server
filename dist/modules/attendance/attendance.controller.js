"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyAttendanceController = exports.getAttendanceController = exports.createAttendanceController = void 0;
const attendance_service_1 = require("./attendance.service");
const createAttendanceController = async (req, res) => {
    const user = req.user;
    const result = await (0, attendance_service_1.createAttendance)(user.id, req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.createAttendanceController = createAttendanceController;
const getAttendanceController = async (req, res) => {
    const user = req.user;
    const result = await (0, attendance_service_1.getAttendance)(user.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getAttendanceController = getAttendanceController;
const getMyAttendanceController = async (req, res) => {
    const user = req.user;
    const result = await (0, attendance_service_1.getMyAttendance)(user.id);
    res.json({
        success: true,
        data: result,
    });
};
exports.getMyAttendanceController = getMyAttendanceController;
