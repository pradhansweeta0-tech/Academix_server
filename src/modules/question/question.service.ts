import { prisma } from "../../config/prisma";

export const createQuestion = async (payload: {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  marks: number;
  testId: string;
}) => {
  return prisma.question.create({
    data: payload,

    include: {
      test: true,
    },
  });
};

export const getQuestions = async (testId: string) => {
  return prisma.question.findMany({
    where: {
      testId,
    },
  });
};

export const getQuestionById = async (id: string) => {
  return prisma.question.findUnique({
    where: {
      id,
    },
  });
};

export const updateQuestion = async (id: string, payload: any) => {
  return prisma.question.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteQuestion = async (id: string) => {
  return prisma.question.delete({
    where: {
      id,
    },
  });
};
