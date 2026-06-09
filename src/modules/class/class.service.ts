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