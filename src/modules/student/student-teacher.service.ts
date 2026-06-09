import { prisma } from "../../config/prisma";

export const assignTeacherToStudent = async (
  studentId: string,
  teacherId: string
) => {
  return prisma.student.update({
    where: {
      id: studentId,
    },

    data: {
      teacherId,
    },

    include: {
      teacher: true,
      board: true,
      class: true,
    },
  });
};