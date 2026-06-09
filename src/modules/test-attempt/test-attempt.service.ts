import { prisma } from "../../config/prisma";

export const attemptTest = async (
  studentId: string,
  testId: string,
  answers: {
    questionId: string;
    selectedAnswer: string;
  }[],
) => {
  const existingAttempt = await prisma.testAttempt.findFirst({
    where: {
      studentId,
      testId,
    },
  });

  if (existingAttempt) {
    throw new Error("Test already attempted");
  }

  const questions = await prisma.question.findMany({
    where: {
      testId,
    },
  });

  let score = 0;

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);

    if (question && question.correctAnswer === answer.selectedAnswer) {
      score += question.marks;
    }
  }

  const attempt = await prisma.testAttempt.create({
    data: {
      studentId,
      testId,
      score,

      answers: {
        create: answers.map((answer) => ({
          questionId: answer.questionId,

          selectedAnswer: answer.selectedAnswer,
        })),
      },
    },

    include: {
      answers: true,
      test: true,
    },
  });

  return attempt;
};

export const getMyAttempts = async (studentId: string) => {
  return prisma.testAttempt.findMany({
    where: {
      studentId,
    },

    include: {
      test: true,
    },

    orderBy: {
      submittedAt: "desc",
    },
  });
};

export const getTestAttempts = async (testId: string) => {
  return prisma.testAttempt.findMany({
    where: {
      testId,
    },

    include: {
      student: true,
      answers: true,
    },
  });
};
