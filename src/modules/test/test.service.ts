import { prisma } from "../../config/prisma";

export const createTest = async (teacherId: string, payload: any) => {
  console.log("TEST PAYLOAD:", payload);
  return prisma.test.create({
    data: {
      ...payload,

      chapterId: payload.chapterId || null,

      startTime: payload.startTime ? new Date(payload.startTime) : null,

      endTime: payload.endTime ? new Date(payload.endTime) : null,
      
      teacherId,
    },

    include: {
      teacher: true,

      board: true,

      class: true,

      subject: true,

      chapter: true,
    },
  });
};

export const getTests = async (teacherId: string) => {
  return prisma.test.findMany({
    where: {
      teacherId,
    },

    include: {
      board: true,
      class: true,
      subject: true,
      chapter: true,

      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
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
      board: true,

      class: true,

      subject: true,

      chapter: true,

      questions: true,

      attempts: true,
    },
  });
};

export const updateTest = async (
  teacherId: string,
  id: string,
  payload: any,
) => {
  const test = await prisma.test.findFirst({
    where: {
      id,
      teacherId,
    },
  });

  if (!test) {
    throw new Error("Test not found");
  }

  return prisma.test.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteTest = async (teacherId: string, id: string) => {
  const test = await prisma.test.findFirst({
    where: {
      id,
      teacherId,
    },
  });

  if (!test) {
    throw new Error("Test not found");
  }

  return prisma.test.delete({
    where: {
      id,
    },
  });
};
