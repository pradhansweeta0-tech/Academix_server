import { prisma } from "../../config/prisma";

export const assignClassesToTeacher = async (
  teacherId: string,
  classIds: string[]
) => {
  return prisma.teacher.update({
    where: {
      id: teacherId,
    },

    data: {
      classes: {
        connect: classIds.map((id) => ({
          id,
        })),
      },
    },

    include: {
      classes: true,
    },
  });
};