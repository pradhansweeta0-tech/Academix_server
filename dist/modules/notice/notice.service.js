"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotice = exports.updateNotice = exports.getNoticeById = exports.getAllNotices = exports.createNotice = void 0;
const prisma_1 = require("../../config/prisma");
const createNotice = async (user, payload) => {
    return prisma_1.prisma.notice.create({
        data: {
            ...payload,
            createdBy: user.id,
            creatorRole: user.role,
        },
    });
};
exports.createNotice = createNotice;
const getAllNotices = async () => {
    return prisma_1.prisma.notice.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllNotices = getAllNotices;
const getNoticeById = async (id) => {
    return prisma_1.prisma.notice.findUnique({
        where: {
            id,
        },
    });
};
exports.getNoticeById = getNoticeById;
const updateNotice = async (id, payload) => {
    return prisma_1.prisma.notice.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateNotice = updateNotice;
const deleteNotice = async (id) => {
    return prisma_1.prisma.notice.delete({
        where: {
            id,
        },
    });
};
exports.deleteNotice = deleteNotice;
