"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.updateAssignment = exports.getAssignmentById = exports.getAssignments = exports.createAssignment = void 0;
const prisma_1 = require("../../config/prisma");
const createAssignment = async (teacherId, payload) => {
    return prisma_1.prisma.assignment.create({
        data: {
            ...payload,
            teacherId,
        },
        include: {
            teacher: true,
        },
    });
};
exports.createAssignment = createAssignment;
const getAssignments = async (teacherId) => {
    return prisma_1.prisma.assignment.findMany({
        where: {
            teacherId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAssignments = getAssignments;
const getAssignmentById = async (teacherId, id) => {
    return prisma_1.prisma.assignment.findFirst({
        where: {
            id,
            teacherId,
        },
    });
};
exports.getAssignmentById = getAssignmentById;
const updateAssignment = async (teacherId, id, payload) => {
    const assignment = await prisma_1.prisma.assignment.findFirst({
        where: {
            id,
            teacherId,
        },
    });
    if (!assignment) {
        throw new Error("Assignment not found");
    }
    return prisma_1.prisma.assignment.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateAssignment = updateAssignment;
const deleteAssignment = async (teacherId, id) => {
    const assignment = await prisma_1.prisma.assignment.findFirst({
        where: {
            id,
            teacherId,
        },
    });
    if (!assignment) {
        throw new Error("Assignment not found");
    }
    return prisma_1.prisma.assignment.delete({
        where: {
            id,
        },
    });
};
exports.deleteAssignment = deleteAssignment;
