"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignClassesToTeacher = void 0;
const prisma_1 = require("../../config/prisma");
const assignClassesToTeacher = async (teacherId, classIds) => {
    return prisma_1.prisma.teacher.update({
        where: {
            id: teacherId,
        },
        data: {
            classes: {
                connect: classIds.map((id) => ({
                    id,
                })),
            },
        },
        include: {
            classes: true,
        },
    });
};
exports.assignClassesToTeacher = assignClassesToTeacher;
