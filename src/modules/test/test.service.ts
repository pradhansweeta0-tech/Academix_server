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

    data: {
      ...payload,

      chapterId: payload.chapterId || null,

      startTime: payload.startTime ? new Date(payload.startTime) : null,

      endTime: payload.endTime ? new Date(payload.endTime) : null,
    },
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

export const getStudentTests = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const tests = await prisma.test.findMany({
    where: {
      isPublished: true,

      subject: {
        classId: student.classId,
        boardId: student.boardId,
      },
    },

    include: {
      subject: true,

      attempts: {
        where: {
          studentId,
        },

        select: {
          id: true,
          score: true,
          createdAt: true,
        },
      },

      _count: {
        select: {
          questions: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return tests.map((test) => ({
    ...test,

    attempted: test.attempts.length > 0,

    attempt: test.attempts[0] || null,

    totalQuestions: test._count.questions,
  }));
};

export const getStudentTestById = async (studentId: string, testId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const test = await prisma.test.findFirst({
    where: {
      id: testId,

      subject: {
        classId: student.classId,
        boardId: student.boardId,
      },
    },

    include: {
      subject: true,

      questions: {
        orderBy: {
          createdAt: "asc",
        },

        select: {
          id: true,

          question: true,
          questionImage: true,

          optionA: true,
          optionB: true,
          optionC: true,
          optionD: true,

          optionAImage: true,
          optionBImage: true,
          optionCImage: true,
          optionDImage: true,

          marks: true,
        },
      },

      attempts: {
        where: {
          studentId,
        },

        select: {
          id: true,
          score: true,
          createdAt: true,
        },
      },
    },
  });

  if (!test) {
    throw new Error("Test not found");
  }

  return {
    ...test,

    attempted: test.attempts.length > 0,

    attempt: test.attempts[0] || null,
  };
};
