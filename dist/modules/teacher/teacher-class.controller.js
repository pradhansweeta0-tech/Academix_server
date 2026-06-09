"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignClassesToTeacherController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const teacher_class_service_1 = require("./teacher-class.service");
exports.assignClassesToTeacherController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await (0, teacher_class_service_1.assignClassesToTeacher)(req.params.teacherId, req.body.classIds);
    res.json({
        success: true,
        data: result,
    });
});
