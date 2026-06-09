"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.getAdminById = exports.getAllAdmins = exports.createAdmin = void 0;
const prisma_1 = require("../../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdmin = async (payload) => {
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    const admin = await prisma_1.prisma.admin.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });
    const { password, ...adminData } = admin;
    return adminData;
};
exports.createAdmin = createAdmin;
const getAllAdmins = async () => {
    return prisma_1.prisma.admin.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllAdmins = getAllAdmins;
const getAdminById = async (id) => {
    return prisma_1.prisma.admin.findUnique({
        where: {
            id,
        },
    });
};
exports.getAdminById = getAdminById;
const updateAdmin = async (id, payload) => {
    return prisma_1.prisma.admin.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = async (id) => {
    return prisma_1.prisma.admin.delete({
        where: {
            id,
        },
    });
};
exports.deleteAdmin = deleteAdmin;
