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

export const getSubjectById = async (
  id: string
) => {
  return prisma.subject.findUnique({
    where: { id },
    include: {
      board: true,
      class: true,
    },
  });
};

export const updateSubject = async (
  id: string,
  payload: {
    name?: string;
    boardId?: string;
    classId?: string;
  }
) => {
  return prisma.subject.update({
    where: { id },
    data: payload,
    include: {
      board: true,
      class: true,
    },
  });
};

export const deleteSubject = async (
  id: string
) => {
  return prisma.subject.delete({
    where: { id },
  });
};