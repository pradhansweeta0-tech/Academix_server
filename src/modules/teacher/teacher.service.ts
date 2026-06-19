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
  classIds?: string[];
  subjectIds?: string[];
}) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const teacher = await prisma.teacher.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,

      qualification: payload.qualification,

      experience: payload.experience,

      bio: payload.bio,

      photo: payload.photo,

      password: hashedPassword,

      classes: {
        connect:
          payload.classIds?.map((id) => ({
            id,
          })) || [],
      },

      subjects: {
        connect:
          payload.subjectIds?.map((id) => ({
            id,
          })) || [],
      },
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
  } catch (error: any) {
    console.log("EMAIL FAILED");

    console.error(error);

    console.log(error?.message);
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

      classes: true,
      subjects: true,

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

    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      photo: payload.photo,

      qualification: payload.qualification,

      experience: payload.experience,

      bio: payload.bio,

      isActive: payload.isActive,

      ...(payload.password && {
        password: payload.password,
      }),

      ...(payload.classIds && {
        classes: {
          set: payload.classIds.map((id: string) => ({
            id,
          })),
        },
      }),

      ...(payload.subjectIds && {
        subjects: {
          set: payload.subjectIds.map((id: string) => ({
            id,
          })),
        },
      }),
    },
  });
};

export const deleteTeacher = async (id: string) => {
  return prisma.teacher.delete({
    where: {
      id,
    },
  });
};

export const getMyProfile = async (teacherId: string) => {
  return prisma.teacher.findUnique({
    where: {
      id: teacherId,
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
      isActive: true,

      classes: {
        include: {
          board: true,
        },
      },

      subjects: {
        include: {
          class: true,
          board: true,
        },
      },

      createdAt: true,
    },
  });
};
