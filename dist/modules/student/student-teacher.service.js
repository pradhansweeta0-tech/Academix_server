"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTeacherToStudent = void 0;
const prisma_1 = require("../../config/prisma");
const assignTeacherToStudent = async (studentId, teacherId) => {
    return prisma_1.prisma.student.update({
        where: {
            id: studentId,
        },
        data: {
            teacherId,
        },
        include: {
            teacher: true,
            board: true,
            class: true,
        },
    });
};
exports.assignTeacherToStudent = assignTeacherToStudent;
