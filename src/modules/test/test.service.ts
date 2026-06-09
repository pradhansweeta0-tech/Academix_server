import { prisma } from "../../config/prisma";

export const createTest = async (teacherId: string, payload: any) => {
  return prisma.test.create({
    data: {
      ...payload,
      teacherId,
    },

    include: {
      teacher: true,
    },
  });
};

export const getTests = async (teacherId: string) => {
  return prisma.test.findMany({
    where: {
      teacherId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTestById = async (teacherId: string, id: string) => {
  return prisma.test.findFirst({
    where: {
      id,
      teacherId,
    },

    include: {
      questions: true,
    },
  });
};

export const updateTest = async (
  teacherId: string,
  id: string,
  payload: any,
) => {
  return prisma.test.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteTest = async (teacherId: string, id: string) => {
  return prisma.test.delete({
    where: {
      id,
    },
  });
};
