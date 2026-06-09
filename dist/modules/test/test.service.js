"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTest = exports.updateTest = exports.getTestById = exports.getTests = exports.createTest = void 0;
const prisma_1 = require("../../config/prisma");
const createTest = async (teacherId, payload) => {
    return prisma_1.prisma.test.create({
        data: {
            ...payload,
            teacherId,
        },
        include: {
            teacher: true,
        },
    });
};
exports.createTest = createTest;
const getTests = async (teacherId) => {
    return prisma_1.prisma.test.findMany({
        where: {
            teacherId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getTests = getTests;
const getTestById = async (teacherId, id) => {
    return prisma_1.prisma.test.findFirst({
        where: {
            id,
            teacherId,
        },
        include: {
            questions: true,
        },
    });
};
exports.getTestById = getTestById;
const updateTest = async (teacherId, id, payload) => {
    return prisma_1.prisma.test.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateTest = updateTest;
const deleteTest = async (teacherId, id) => {
    return prisma_1.prisma.test.delete({
        where: {
            id,
        },
    });
};
exports.deleteTest = deleteTest;
