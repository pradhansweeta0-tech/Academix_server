import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";

export const createStudent = async (payload: any) => {
  const board = await prisma.board.findUnique({
    where: {
      id: payload.boardId,
    },
  });

  const session = await prisma.academicSession.findUnique({
    where: {
      id: payload.academicSessionId,
    },
  });

  if (!board || !session) {
    throw new Error("Board or Academic Session not found");
  }

  const year = session.name.slice(2, 4);

  const boardCode = board.shortName;

  const latestStudent = await prisma.student.findFirst({
    where: {
      boardId: payload.boardId,
      academicSessionId: payload.academicSessionId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  let nextNumber = 1;

  if (latestStudent) {
    const lastNumber = parseInt(latestStudent.studentId.slice(-4));

    nextNumber = lastNumber + 1;
  }

  const studentId = `${year}${boardCode}${String(nextNumber).padStart(4, "0")}`;

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const student = await prisma.student.create({
    data: {
      ...payload,
      studentId,
      password: hashedPassword,
    },
    include: {
      board: true,
      class: true,
      academicSession: true,
    },
  });

  const { password, ...studentData } = student;

  return studentData;
};

export const getAllStudents = async () => {
  return prisma.student.findMany({
    select: {
      id: true,
      studentId: true,

      name: true,
      email: true,
      phone: true,

      gender: true,
      dateOfBirth: true,

      guardianName: true,
      guardianPhone: true,

      address: true,

      isActive: true,

      boardId: true,
      classId: true,
      academicSessionId: true,

      board: true,
      class: true,
      academicSession: true,

      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getStudentById = async (id: string) => {
  return prisma.student.findUnique({
    where: { id },

    select: {
      id: true,
      studentId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,

      board: true,
      class: true,
      academicSession: true,
    },
  });
};

export const updateStudent = async (id: string, payload: any) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  return prisma.student.update({
    where: { id },
    data: payload,
  });
};

export const deleteStudent = async (id: string) => {
  return prisma.student.delete({
    where: { id },
  });
};
