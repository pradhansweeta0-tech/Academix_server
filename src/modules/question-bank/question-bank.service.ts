import { prisma } from "../../config/prisma";

export const createQuestionBank = async (teacherId: string, payload: any) => {
  return prisma.questionBank.create({
    data: {
      ...payload,
      teacherId,
    },

    include: {
      board: true,
      class: true,
      subject: true,
      chapter: true,
    },
  });
};

export const getQuestionBanks = async (teacherId: string) => {
  return prisma.questionBank.findMany({
    where: {
      teacherId,
    },

    include: {
      board: true,
      class: true,
      subject: true,
      chapter: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getQuestionBankById = async (id: string) => {
  return prisma.questionBank.findUnique({
    where: {
      id,
    },
  });
};

export const updateQuestionBank = async (id: string, payload: any) => {
  return prisma.questionBank.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteQuestionBank = async (id: string) => {
  return prisma.questionBank.delete({
    where: {
      id,
    },
  });
};
