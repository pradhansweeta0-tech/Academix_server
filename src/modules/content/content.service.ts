import { prisma } from "../../config/prisma";

export const createContent = async (payload: {
  title: string;
  description?: string;
  chapterId: string;
  orderNo?: number;
}) => {
  return prisma.content.create({
    data: payload,

    include: {
      chapter: true,
    },
  });
};

export const getAllContents = async () => {
  return prisma.content.findMany({
    include: {
      chapter: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getContentById = async (id: string) => {
  return prisma.content.findUnique({
    where: {
      id,
    },

    include: {
      chapter: true,
    },
  });
};

export const updateContent = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    orderNo?: number;
    isPublished?: boolean;
  },
) => {
  return prisma.content.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteContent = async (id: string) => {
  return prisma.content.delete({
    where: {
      id,
    },
  });
};

export const getContentsByChapter = async (chapterId: string) => {
  return prisma.content.findMany({
    where: {
      chapterId,
    },

    orderBy: {
      orderNo: "asc",
    },
  });
};
