"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.getQuestionById = exports.getQuestions = exports.createQuestion = void 0;
const prisma_1 = require("../../config/prisma");
const createQuestion = async (payload) => {
    return prisma_1.prisma.question.create({
        data: payload,
        include: {
            test: true,
        },
    });
};
exports.createQuestion = createQuestion;
const getQuestions = async (testId) => {
    return prisma_1.prisma.question.findMany({
        where: {
            testId,
        },
    });
};
exports.getQuestions = getQuestions;
const getQuestionById = async (id) => {
    return prisma_1.prisma.question.findUnique({
        where: {
            id,
        },
    });
};
exports.getQuestionById = getQuestionById;
const updateQuestion = async (id, payload) => {
    return prisma_1.prisma.question.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateQuestion = updateQuestion;
const deleteQuestion = async (id) => {
    return prisma_1.prisma.question.delete({
        where: {
            id,
        },
    });
};
exports.deleteQuestion = deleteQuestion;
