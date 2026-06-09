import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";

export const createAdmin = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const admin = await prisma.admin.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  const { password, ...adminData } = admin;

  return adminData;
};

export const getAllAdmins = async () => {
  return prisma.admin.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAdminById = async (id: string) => {
  return prisma.admin.findUnique({
    where: {
      id,
    },
  });
};

export const updateAdmin = async (id: string, payload: any) => {
  return prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteAdmin = async (id: string) => {
  return prisma.admin.delete({
    where: {
      id,
    },
  });
};
