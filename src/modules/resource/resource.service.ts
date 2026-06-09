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

export const getResourceById = async (
  id: string
) => {
  return prisma.resource.findUnique({
    where: {
      id,
    },
    include: {
      content: true,
    },
  });
};

export const updateResource = async (
  id: string,
  payload: any
) => {
  return prisma.resource.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteResource = async (
  id: string
) => {
  return prisma.resource.delete({
    where: {
      id,
    },
  });
};