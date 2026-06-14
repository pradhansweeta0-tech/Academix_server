import { prisma } from "../../config/prisma";

export const createChapter = async (payload: {
  chapterNo: number;
  name: string;
  description?: string;
  subjectId: string;
}) => {
  return prisma.chapter.create({
    data: payload,
    include: {
      subject: true,
    },
  });
};

export const getAllChapters = async () => {
  return prisma.chapter.findMany({
    include: {
      subject: true,
    },
  });
};

export const getChapterById = async (id: string) => {
  return prisma.chapter.findUnique({
    where: {
      id,
    },
    include: {
      subject: true,
    },
  });
};

export const updateChapter = async (
  id: string,
  payload: {
    chapterNo?: number;
    name?: string;
    description?: string;
    isPublished?: boolean;
  }
) => {
  return prisma.chapter.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteChapter = async (id: string) => {
  return prisma.chapter.delete({
    where: {
      id,
    },
  });
};

export const getChaptersBySubject = async (
  subjectId: string,
) => {
  return prisma.chapter.findMany({
    where: {
      subjectId,
    },

    orderBy: {
      chapterNo: "asc",
    },
  });
};