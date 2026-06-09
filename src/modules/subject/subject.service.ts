import { prisma } from "../../config/prisma";

export const createSubject = async (payload: {
  name: string;
  boardId: string;
  classId: string;
}) => {
  return prisma.subject.create({
    data: payload,
    include: {
      board: true,
      class: true,
    },
  });
};

export const getAllSubjects = async () => {
  return prisma.subject.findMany({
    include: {
      board: true,
      class: true,
    },
  });
};