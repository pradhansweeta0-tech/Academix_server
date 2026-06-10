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

export const getBoardById = async (
  id: string
) => {
  return prisma.board.findUnique({
    where: { id },
  });
};

export const updateBoard = async (
  id: string,
  payload: {
    name?: string;
    shortName?: string;
    description?: string;
  }
) => {
  return prisma.board.update({
    where: { id },
    data: payload,
  });
};

export const deleteBoard = async (
  id: string
) => {
  return prisma.board.delete({
    where: { id },
  });
};