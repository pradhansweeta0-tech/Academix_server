import { prisma } from "../../config/prisma";

export const createTeacherResource = async (
  teacherId: string,
  payload: any,
) => {
  return prisma.resource.create({
    data: {
      ...payload,
      teacherId,
    },

    include: {
      teacher: true,
      content: true,
    },
  });
};

export const getTeacherResources = async (teacherId: string) => {
  return prisma.resource.findMany({
    where: {
      teacherId,
    },

    include: {
      content: {
        include: {
          chapter: {
            include: {
              subject: {
                include: {
                  class: {
                    include: {
                      board: true,
                    },
                  },
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

export const getTeacherResourceById = async (teacherId: string, id: string) => {
  return prisma.resource.findFirst({
    where: {
      id,
      teacherId,
    },

    include: {
      content: {
        include: {
          chapter: {
            include: {
              subject: {
                include: {
                  class: {
                    include: {
                      board: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
};

export const updateTeacherResource = async (
  teacherId: string,
  id: string,
  payload: any,
) => {
  const resource = await prisma.resource.findFirst({
    where: {
      id,
      teacherId,
    },
  });

  if (!resource) {
    throw new Error("Resource not found");
  }

  return prisma.resource.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteTeacherResource = async (teacherId: string, id: string) => {
  const resource = await prisma.resource.findFirst({
    where: {
      id,
      teacherId,
    },
  });

  if (!resource) {
    throw new Error("Resource not found");
  }

  return prisma.resource.delete({
    where: {
      id,
    },
  });
};

export const uploadTeacherResource = async (
  teacherId: string,
  payload: any,
) => {
  return prisma.resource.create({
    data: {
      ...payload,
      teacherId,
    },

    include: {
      teacher: true,
      content: true,
    },
  });
};

export const getTeacherResourceStats = async (teacherId: string) => {
  const totalResources = await prisma.resource.count({
    where: {
      teacherId,
    },
  });

  const pdfs = await prisma.resource.count({
    where: {
      teacherId,
      type: "PDF",
    },
  });

  const videos = await prisma.resource.count({
    where: {
      teacherId,
      type: "VIDEO",
    },
  });

  const published = await prisma.resource.count({
    where: {
      teacherId,
      isPublished: true,
    },
  });

  return {
    totalResources,
    pdfs,
    videos,
    published,
  };
};
