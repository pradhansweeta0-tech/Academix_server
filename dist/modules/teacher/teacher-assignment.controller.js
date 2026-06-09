"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSubjectsToTeacherController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const teacher_assignment_service_1 = require("./teacher-assignment.service");
exports.assignSubjectsToTeacherController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await (0, teacher_assignment_service_1.assignSubjectsToTeacher)(req.params.teacherId, req.body.subjectIds);
    res.json({
        success: true,
        data: result,
    });
});
