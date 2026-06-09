import { prisma } from "../../config/prisma";

export const createNotice = async (
  user: any,
  payload: {
    title: string;
    description: string;
    audience?: "ALL" | "STUDENTS" | "TEACHERS";
  },
) => {
  return prisma.notice.create({
    data: {
      ...payload,

      createdBy: user.id,
      creatorRole: user.role,
    },
  });
};

export const getAllNotices = async () => {
  return prisma.notice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getNoticeById = async (id: string) => {
  return prisma.notice.findUnique({
    where: {
      id,
    },
  });
};

export const updateNotice = async (id: string, payload: any) => {
  return prisma.notice.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteNotice = async (id: string) => {
  return prisma.notice.delete({
    where: {
      id,
    },
  });
};
