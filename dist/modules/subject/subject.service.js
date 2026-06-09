"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubjects = exports.createSubject = void 0;
const prisma_1 = require("../../config/prisma");
const createSubject = async (payload) => {
    return prisma_1.prisma.subject.create({
        data: payload,
        include: {
            board: true,
            class: true,
        },
    });
};
exports.createSubject = createSubject;
const getAllSubjects = async () => {
    return prisma_1.prisma.subject.findMany({
        include: {
            board: true,
            class: true,
        },
    });
};
exports.getAllSubjects = getAllSubjects;
