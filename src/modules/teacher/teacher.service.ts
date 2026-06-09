import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import { sendEmail } from "../../services/email/email.service";
import { welcomeTeacherTemplate } from "../../services/email/templates/welcome-teacher.template";

export const createTeacher = async (payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
  qualification?: string;
  experience?: number;
  bio?: string;
  photo?: string;
}) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const teacher = await prisma.teacher.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  try {
    await sendEmail(
      teacher.email,
      "Welcome to NBCA",
      welcomeTeacherTemplate({
        name: teacher.name,
        email: teacher.email,
      }),
    );
  } catch (error) {
    console.error("Teacher welcome email failed:", error);
  }

  const { password, ...teacherData } = teacher;

  return teacherData;
};

export const getAllTeachers = async () => {
  return prisma.teacher.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      photo: true,
      qualification: true,
      experience: true,
      bio: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getTeacherById = async (id: string) => {
  return prisma.teacher.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      photo: true,
      qualification: true,
      experience: true,
      bio: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      subjects: true,
      classes: true,
    },
  });
};

export const updateTeacher = async (id: string, payload: any) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  return prisma.teacher.update({
    where: { id },
    data: payload,
  });
};

export const deleteTeacher = async (id: string) => {
  return prisma.teacher.delete({
    where: {
      id,
    },
  });
};
