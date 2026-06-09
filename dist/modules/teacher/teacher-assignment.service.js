"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSubjectsToTeacher = void 0;
const prisma_1 = require("../../config/prisma");
const assignSubjectsToTeacher = async (teacherId, subjectIds) => {
    return prisma_1.prisma.teacher.update({
        where: {
            id: teacherId,
        },
        data: {
            subjects: {
                connect: subjectIds.map((id) => ({
                    id,
                })),
            },
        },
        include: {
            subjects: true,
        },
    });
};
exports.assignSubjectsToTeacher = assignSubjectsToTeacher;
