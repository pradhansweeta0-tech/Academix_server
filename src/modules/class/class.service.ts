import { prisma } from "../../config/prisma";

export const createClass = async (payload: {
  name: string;
  boardId: string;
}) => {
  return prisma.class.create({
    data: payload,
    include: {
      board: true,
    },
  });
};

export const getAllClasses = async () => {
  return prisma.class.findMany({
    include: {
      board: true,
    },
  });
};

export const getClassById = async (id: string) => {
  return prisma.class.findUnique({
    where: { id },
    include: {
      board: true,
    },
  });
};

export const updateClass = async (
  id: string,
  payload: {
    name?: string;
    boardId?: string;
  },
) => {
  return prisma.class.update({
    where: { id },
    data: payload,
    include: {
      board: true,
    },
  });
};

export const deleteClass = async (id: string) => {
  return prisma.class.delete({
    where: { id },
  });
};
