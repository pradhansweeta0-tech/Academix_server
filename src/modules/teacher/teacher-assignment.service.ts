import { prisma } from "../../config/prisma";

export const assignSubjectsToTeacher = async (
  teacherId: string,
  subjectIds: string[]
) => {
  return prisma.teacher.update({
    where: {
      id: teacherId,
    },

    data: {
      subjects: {
        connect: subjectIds.map((id) => ({
          id,
        })),
      },
    },

    include: {
      subjects: true,
    },
  });
};