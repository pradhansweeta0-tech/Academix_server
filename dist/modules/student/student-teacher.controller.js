"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTeacherToStudentController = void 0;
const student_teacher_service_1 = require("./student-teacher.service");
const assignTeacherToStudentController = async (req, res) => {
    const result = await (0, student_teacher_service_1.assignTeacherToStudent)(req.params.studentId, req.body.teacherId);
    res.json({
        success: true,
        data: result,
    });
};
exports.assignTeacherToStudentController = assignTeacherToStudentController;
