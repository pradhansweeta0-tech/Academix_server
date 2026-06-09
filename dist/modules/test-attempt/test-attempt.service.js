"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestAttempts = exports.getMyAttempts = exports.attemptTest = void 0;
const prisma_1 = require("../../config/prisma");
const attemptTest = async (studentId, testId, answers) => {
    const existingAttempt = await prisma_1.prisma.testAttempt.findFirst({
        where: {
            studentId,
            testId,
        },
    });
    if (existingAttempt) {
        throw new Error("Test already attempted");
    }
    const questions = await prisma_1.prisma.question.findMany({
        where: {
            testId,
        },
    });
    let score = 0;
    for (const answer of answers) {
        const question = questions.find((q) => q.id === answer.questionId);
        if (question && question.correctAnswer === answer.selectedAnswer) {
            score += question.marks;
        }
    }
    const attempt = await prisma_1.prisma.testAttempt.create({
        data: {
            studentId,
            testId,
            score,
            answers: {
                create: answers.map((answer) => ({
                    questionId: answer.questionId,
                    selectedAnswer: answer.selectedAnswer,
                })),
            },
        },
        include: {
            answers: true,
            test: true,
        },
    });
    return attempt;
};
exports.attemptTest = attemptTest;
const getMyAttempts = async (studentId) => {
    return prisma_1.prisma.testAttempt.findMany({
        where: {
            studentId,
        },
        include: {
            test: true,
        },
        orderBy: {
            submittedAt: "desc",
        },
    });
};
exports.getMyAttempts = getMyAttempts;
const getTestAttempts = async (testId) => {
    return prisma_1.prisma.testAttempt.findMany({
        where: {
            testId,
        },
        include: {
            student: true,
            answers: true,
        },
    });
};
exports.getTestAttempts = getTestAttempts;
