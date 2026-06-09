import { prisma } from "../../config/prisma";

export const createBoard = async (payload: {
  name: string;
  shortName: string;
  description?: string;
}) => {
  return prisma.board.create({
    data: payload,
  });
};

export const getAllBoards = async () => {
  return prisma.board.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};