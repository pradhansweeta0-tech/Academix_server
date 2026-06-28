import { prisma } from "../../config/prisma";

export const createAttendance = async (
  teacherId: string,
  payload: {
    studentId: string;
    status: "PRESENT" | "ABSENT" | "LATE";
  },
) => {
  const today = new Date();

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      studentId: payload.studentId,

      date: {
        gte: new Date(today.setHours(0, 0, 0, 0)),

        lte: new Date(today.setHours(23, 59, 59, 999)),
      },
    },
  });

  if (existingAttendance) {
    throw new Error("Attendance already marked today");
  }

  return prisma.attendance.create({
    data: {
      studentId: payload.studentId,

      status: payload.status,

      teacherId,

      date: new Date(),
    },

    include: {
      student: true,
      teacher: true,
    },
  });
};

export const getAttendance = async (teacherId: string) => {
  return prisma.attendance.findMany({
    where: {
      teacherId,
    },

    include: {
      student: true,
    },

    orderBy: {
      date: "desc",
    },
  });
};

export const getMyAttendance = async (studentId: string) => {
  return prisma.attendance.findMany({
    where: {
      studentId,
    },

    orderBy: {
      date: "desc",
    },
  });
};
