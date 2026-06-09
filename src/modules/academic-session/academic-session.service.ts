import { prisma } from "../../config/prisma";

export const createAcademicSession = async (payload: {
  name: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "INACTIVE";
}) => {
  const result = await prisma.academicSession.create({
    data: {
      ...payload,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
    },
  });

  return result;
};

export const getAllAcademicSessions = async () => {
  return prisma.academicSession.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAcademicSessionById = async (id: string) => {
  return prisma.academicSession.findUnique({
    where: {
      id,
    },
  });
};

export const updateAcademicSession = async (
  id: string,
  payload: {
    name?: string;
    startDate?: string;
    endDate?: string;
    status?: "ACTIVE" | "INACTIVE";
  }
) => {
  return prisma.academicSession.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.startDate && {
        startDate: new Date(payload.startDate),
      }),
      ...(payload.endDate && {
        endDate: new Date(payload.endDate),
      }),
      ...(payload.status && {
        status: payload.status,
      }),
    },
  });
};

export const deleteAcademicSession = async (id: string) => {
  return prisma.academicSession.delete({
    where: {
      id,
    },
  });
};