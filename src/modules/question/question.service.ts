import { prisma } from "../../config/prisma";

export const createQuestion = async (payload: {
  question: string;

  questionImage?: string;

  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  optionAImage?: string;
  optionBImage?: string;
  optionCImage?: string;
  optionDImage?: string;

  correctAnswer: string;

  explanation?: string;

  difficulty?: string;

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

    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getQuestionById = async (id: string) => {
  return prisma.question.findUnique({
    where: {
      id,
    },

    include: {
      test: true,
    },
  });
};

export const updateQuestion = async (id: string, payload: any) => {
  const question = await prisma.question.findUnique({
    where: {
      id,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  return prisma.question.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteQuestion = async (id: string) => {
  const question = await prisma.question.findUnique({
    where: {
      id,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  return prisma.question.delete({
    where: {
      id,
    },
  });
};
