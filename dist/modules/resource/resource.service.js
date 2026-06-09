"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.getResourceById = exports.getAllResources = exports.createResource = void 0;
const prisma_1 = require("../../config/prisma");
const createResource = async (payload) => {
    return prisma_1.prisma.resource.create({
        data: payload,
        include: {
            content: true,
        },
    });
};
exports.createResource = createResource;
const getAllResources = async () => {
    return prisma_1.prisma.resource.findMany({
        include: {
            content: true,
        },
    });
};
exports.getAllResources = getAllResources;
const getResourceById = async (id) => {
    return prisma_1.prisma.resource.findUnique({
        where: {
            id,
        },
        include: {
            content: true,
        },
    });
};
exports.getResourceById = getResourceById;
const updateResource = async (id, payload) => {
    return prisma_1.prisma.resource.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateResource = updateResource;
const deleteResource = async (id) => {
    return prisma_1.prisma.resource.delete({
        where: {
            id,
        },
    });
};
exports.deleteResource = deleteResource;
