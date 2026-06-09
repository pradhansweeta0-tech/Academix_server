import { prisma } from "../../config/prisma";

export const createAssignment = async (
  teacherId: string,
  payload: any
) => {
  return prisma.assignment.create({
    data: {
      ...payload,
      teacherId,
    },

    include: {
      teacher: true,
    },
  });
};

export const getAssignments = async (
  teacherId: string
) => {
  return prisma.assignment.findMany({
    where: {
      teacherId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAssignmentById = async (
  teacherId: string,
  id: string
) => {
  return prisma.assignment.findFirst({
    where: {
      id,
      teacherId,
    },
  });
};

export const updateAssignment = async (
  teacherId: string,
  id: string,
  payload: any
) => {

  const assignment =
    await prisma.assignment.findFirst({
      where: {
        id,
        teacherId,
      },
    });

  if (!assignment) {
    throw new Error(
      "Assignment not found"
    );
  }

  return prisma.assignment.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteAssignment = async (
  teacherId: string,
  id: string
) => {

  const assignment =
    await prisma.assignment.findFirst({
      where: {
        id,
        teacherId,
      },
    });

  if (!assignment) {
    throw new Error(
      "Assignment not found"
    );
  }

  return prisma.assignment.delete({
    where: {
      id,
    },
  });
};