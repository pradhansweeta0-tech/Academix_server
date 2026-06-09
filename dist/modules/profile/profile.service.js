"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStudentCard = exports.getStudentIdCard = exports.updateMyProfile = exports.getMyProfile = void 0;
const prisma_1 = require("../../config/prisma");
const getMyProfile = async (studentId) => {
    return prisma_1.prisma.student.findUnique({
        where: {
            id: studentId,
        },
        include: {
            board: true,
            class: true,
            academicSession: true,
            teacher: true,
        },
    });
};
exports.getMyProfile = getMyProfile;
const updateMyProfile = async (studentId, payload) => {
    return prisma_1.prisma.student.update({
        where: {
            id: studentId,
        },
        data: payload,
        include: {
            board: true,
            class: true,
            academicSession: true,
            teacher: true,
        },
    });
};
exports.updateMyProfile = updateMyProfile;
const getStudentIdCard = async (studentId) => {
    return prisma_1.prisma.student.findUnique({
        where: {
            id: studentId,
        },
        include: {
            board: true,
            class: true,
            academicSession: true,
        },
    });
};
exports.getStudentIdCard = getStudentIdCard;
const verifyStudentCard = async (studentId) => {
    const student = await prisma_1.prisma.student.findUnique({
        where: {
            studentId,
        },
        include: {
            board: true,
            class: true,
        },
    });
    if (!student) {
        throw new Error("Invalid Student ID");
    }
    return {
        valid: true,
        studentId: student.studentId,
        name: student.name,
        board: student.board.name,
        class: student.class.name,
        status: student.isActive
            ? "ACTIVE"
            : "INACTIVE",
    };
};
exports.verifyStudentCard = verifyStudentCard;
