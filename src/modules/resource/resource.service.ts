import { prisma } from "../../config/prisma";

export const createResource = async (payload: {
  title: string;
  type:
    | "PDF"
    | "IMAGE"
    | "VIDEO"
    | "PPT"
    | "EXCEL"
    | "DOC"
    | "ASSIGNMENT"
    | "LINK";

  fileUrl?: string;
  youtubeUrl?: string;

  contentId: string;
}) => {
  return prisma.resource.create({
    data: payload,
    include: {
      content: true,
    },
  });
};

export const getAllResources = async () => {
  return prisma.resource.findMany({
    include: {
      content: true,
    },
  });
};

export const getResourceById = async (id: string) => {
  return prisma.resource.findUnique({
    where: {
      id,
    },
    include: {
      content: true,
    },
  });
};

export const updateResource = async (id: string, payload: any) => {
  return prisma.resource.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteResource = async (id: string) => {
  return prisma.resource.delete({
    where: {
      id,
    },
  });
};

export const getStudentResources = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return prisma.resource.findMany({
    where: {
      content: {
        chapter: {
          subject: {
            classId: student.classId,

            boardId: student.boardId,
          },
        },
      },
    },

    include: {
      content: {
        include: {
          chapter: {
            include: {
              subject: {
                include: {
                  board: true,
                  class: true,
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
