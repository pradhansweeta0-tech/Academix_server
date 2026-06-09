"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAcademicSession = exports.updateAcademicSession = exports.getAcademicSessionById = exports.getAllAcademicSessions = exports.createAcademicSession = void 0;
const prisma_1 = require("../../config/prisma");
const createAcademicSession = async (payload) => {
    const result = await prisma_1.prisma.academicSession.create({
        data: {
            ...payload,
            startDate: new Date(payload.startDate),
            endDate: new Date(payload.endDate),
        },
    });
    return result;
};
exports.createAcademicSession = createAcademicSession;
const getAllAcademicSessions = async () => {
    return prisma_1.prisma.academicSession.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllAcademicSessions = getAllAcademicSessions;
const getAcademicSessionById = async (id) => {
    return prisma_1.prisma.academicSession.findUnique({
        where: {
            id,
        },
    });
};
exports.getAcademicSessionById = getAcademicSessionById;
const updateAcademicSession = async (id, payload) => {
    return prisma_1.prisma.academicSession.update({
        where: { id },
        data: {
            ...(payload.name && { name: payload.name }),
            ...(payload.startDate && {
                startDate: new Date(payload.startDate),
            }),
            ...(payload.endDate && {
                endDate: new Date(payload.endDate),
            }),
            ...(payload.status && {
                status: payload.status,
            }),
        },
    });
};
exports.updateAcademicSession = updateAcademicSession;
const deleteAcademicSession = async (id) => {
    return prisma_1.prisma.academicSession.delete({
        where: {
            id,
        },
    });
};
exports.deleteAcademicSession = deleteAcademicSession;
