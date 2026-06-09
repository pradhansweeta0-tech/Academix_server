"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBoards = exports.createBoard = void 0;
const prisma_1 = require("../../config/prisma");
const createBoard = async (payload) => {
    return prisma_1.prisma.board.create({
        data: payload,
    });
};
exports.createBoard = createBoard;
const getAllBoards = async () => {
    return prisma_1.prisma.board.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllBoards = getAllBoards;
