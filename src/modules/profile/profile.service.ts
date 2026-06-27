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
  const updateData: any = {};

  if (payload.name !== undefined) updateData.name = payload.name;

  if (payload.email !== undefined) updateData.email = payload.email;

  if (payload.mobile !== undefined) updateData.mobile = payload.mobile;

  if (payload.gender !== undefined) updateData.gender = payload.gender;

  if (payload.address !== undefined) updateData.address = payload.address;

  if (payload.guardianName !== undefined)
    updateData.guardianName = payload.guardianName;

  if (payload.guardianPhone !== undefined)
    updateData.guardianPhone = payload.guardianPhone;

  if (payload.photo !== undefined) updateData.photo = payload.photo;

  return prisma.student.update({
    where: {
      id: studentId,
    },
    data: updateData,
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

export const verifyStudentCard = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      studentId,
    },

    include: {
      board: true,
      class: true,
    },
  });

  if (!student) {
    throw new Error("Invalid Student ID");
  }

  return {
    valid: true,
    studentId: student.studentId,
    name: student.name,
    board: student.board.name,
    class: student.class.name,
    status: student.isActive ? "ACTIVE" : "INACTIVE",
  };
};
