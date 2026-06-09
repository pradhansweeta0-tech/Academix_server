"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClasses = exports.createClass = void 0;
const prisma_1 = require("../../config/prisma");
const createClass = async (payload) => {
    return prisma_1.prisma.class.create({
        data: payload,
        include: {
            board: true,
        },
    });
};
exports.createClass = createClass;
const getAllClasses = async () => {
    return prisma_1.prisma.class.findMany({
        include: {
            board: true,
        },
    });
};
exports.getAllClasses = getAllClasses;
