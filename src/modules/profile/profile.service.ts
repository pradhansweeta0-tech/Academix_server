import { prisma } from "../../config/prisma";

export const getMyProfile = async (studentId: string) => {
  return prisma.student.findUnique({
    where: {
      id: studentId,
    },

    include: {
      board: true,
      class: true,
      academicSession: true,
      teacher: true,
    },
  });
};

export const updateMyProfile = async (studentId: string, payload: any) => {
  return prisma.student.update({
    where: {
      id: studentId,
    },

    data: payload,

    include: {
      board: true,
      class: true,
      academicSession: true,
      teacher: true,
    },
  });
};

export const getStudentIdCard = async (studentId: string) => {
  return prisma.student.findUnique({
    where: {
      id: studentId,
    },

    include: {
      board: true,
      class: true,
      academicSession: true,
    },
  });
};

export const verifyStudentCard =
  async (
    studentId: string
  ) => {

    const student =
      await prisma.student.findUnique({
        where: {
          studentId,
        },

        include: {
          board: true,
          class: true,
        },
      });

    if (!student) {
      throw new Error(
        "Invalid Student ID"
      );
    }

    return {
      valid: true,
      studentId:
        student.studentId,
      name: student.name,
      board:
        student.board.name,
      class:
        student.class.name,
      status:
        student.isActive
          ? "ACTIVE"
          : "INACTIVE",
    };
  };