"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyAttendance = exports.getAttendance = exports.createAttendance = void 0;
const prisma_1 = require("../../config/prisma");
const createAttendance = async (teacherId, payload) => {
    const today = new Date();
    const existingAttendance = await prisma_1.prisma.attendance.findFirst({
        where: {
            studentId: payload.studentId,
            date: {
                gte: new Date(today.setHours(0, 0, 0, 0)),
                lte: new Date(today.setHours(23, 59, 59, 999)),
            },
        },
    });
    if (existingAttendance) {
        throw new Error("Attendance already marked today");
    }
    return prisma_1.prisma.attendance.create({
        data: {
            studentId: payload.studentId,
            status: payload.status,
            teacherId,
            date: new Date(),
        },
        include: {
            student: true,
            teacher: true,
        },
    });
};
exports.createAttendance = createAttendance;
const getAttendance = async (teacherId) => {
    return prisma_1.prisma.attendance.findMany({
        where: {
            teacherId,
        },
        include: {
            student: true,
        },
        orderBy: {
            date: "desc",
        },
    });
};
exports.getAttendance = getAttendance;
const getMyAttendance = async (studentId) => {
    return prisma_1.prisma.attendance.findMany({
        where: {
            studentId,
        },
        orderBy: {
            date: "desc",
        },
    });
};
exports.getMyAttendance = getMyAttendance;
