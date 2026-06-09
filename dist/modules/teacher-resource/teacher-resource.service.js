"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTeacherResource = exports.deleteTeacherResource = exports.updateTeacherResource = exports.getTeacherResourceById = exports.getTeacherResources = exports.createTeacherResource = void 0;
const prisma_1 = require("../../config/prisma");
const createTeacherResource = async (teacherId, payload) => {
    return prisma_1.prisma.resource.create({
        data: {
            ...payload,
            teacherId,
        },
        include: {
            teacher: true,
            content: true,
        },
    });
};
exports.createTeacherResource = createTeacherResource;
const getTeacherResources = async (teacherId) => {
    return prisma_1.prisma.resource.findMany({
        where: {
            teacherId,
        },
        include: {
            content: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getTeacherResources = getTeacherResources;
const getTeacherResourceById = async (teacherId, id) => {
    return prisma_1.prisma.resource.findFirst({
        where: {
            id,
            teacherId,
        },
        include: {
            content: true,
        },
    });
};
exports.getTeacherResourceById = getTeacherResourceById;
const updateTeacherResource = async (teacherId, id, payload) => {
    const resource = await prisma_1.prisma.resource.findFirst({
        where: {
            id,
            teacherId,
        },
    });
    if (!resource) {
        throw new Error("Resource not found");
    }
    return prisma_1.prisma.resource.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateTeacherResource = updateTeacherResource;
const deleteTeacherResource = async (teacherId, id) => {
    const resource = await prisma_1.prisma.resource.findFirst({
        where: {
            id,
            teacherId,
        },
    });
    if (!resource) {
        throw new Error("Resource not found");
    }
    return prisma_1.prisma.resource.delete({
        where: {
            id,
        },
    });
};
exports.deleteTeacherResource = deleteTeacherResource;
const uploadTeacherResource = async (teacherId, payload) => {
    return prisma_1.prisma.resource.create({
        data: {
            ...payload,
            teacherId,
        },
        include: {
            teacher: true,
            content: true,
        },
    });
};
exports.uploadTeacherResource = uploadTeacherResource;
