import { prisma } from "../../config/prisma";
import { sendEmail } from "../../services/email/email.service";
import { liveClassTemplate } from "../../services/email/templates/live-class.template";

export const createLiveClass = async (teacherId: string, payload: any) => {
  const liveClass = await prisma.liveClass.create({
    data: {
      title: payload.title,
      description: payload.description,
      meetingLink: payload.meetingLink,
      startTime: payload.startTime,
      endTime: payload.endTime,

      teacherId,
      classId: payload.classId,
      subjectId: payload.subjectId,
    },

    include: {
      teacher: true,
      class: true,
      subject: true,
    },
  });

  const students = await prisma.student.findMany({
    where: {
      classId: payload.classId,
      isActive: true,
    },
  });

  for (const student of students) {
    if (!student.email) continue;

    Promise.all(
      students
        .filter((student) => student.email)
        .map((student) =>
          sendEmail(
            student.email!,
            `New Live Class - ${liveClass.title}`,
            liveClassTemplate(
              student.name,
              liveClass.title,
              liveClass.subject.name,
              liveClass.teacher.name,
              liveClass.meetingLink,
              liveClass.startTime,
            ),
          ),
        ),
    );
  }

  return liveClass;
};

export const getLiveClasses = async (teacherId: string) => {
  return prisma.liveClass.findMany({
    where: {
      teacherId,
    },

    include: {
      class: true,
      subject: true,
      teacher: true,
    },

    orderBy: {
      startTime: "asc",
    },
  });
};

export const getLiveClassById = async (teacherId: string, id: string) => {
  return prisma.liveClass.findFirst({
    where: {
      id,
      teacherId,
    },

    include: {
      teacher: true,
      class: true,
      subject: true,
    },
  });
};

export const updateLiveClass = async (
  teacherId: string,
  id: string,
  payload: any,
) => {
  const liveClass = await prisma.liveClass.findFirst({
    where: {
      id,
      teacherId,
    },
  });

  if (!liveClass) {
    throw new Error("Live Class not found");
  }

  return prisma.liveClass.update({
    where: {
      id,
    },

    data: payload,
  });
};

export const deleteLiveClass = async (teacherId: string, id: string) => {
  const liveClass = await prisma.liveClass.findFirst({
    where: {
      id,
      teacherId,
    },
  });

  if (!liveClass) {
    throw new Error("Live Class not found");
  }

  return prisma.liveClass.delete({
    where: {
      id,
    },
  });
};

export const getUpcomingClasses = async () => {
  return prisma.liveClass.findMany({
    where: {
      startTime: {
        gte: new Date(),
      },

      isActive: true,
    },

    include: {
      teacher: true,
      class: true,
      subject: true,
    },

    orderBy: {
      startTime: "asc",
    },
  });
};

export const getStudentLiveClasses = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return prisma.liveClass.findMany({
    where: {
      classId: student.classId,
      isActive: true,
    },

    include: {
      teacher: true,
      class: true,
      subject: true,
    },

    orderBy: {
      startTime: "asc",
    },
  });
};

export const joinLiveClass = async (studentId: string, liveClassId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const liveClass = await prisma.liveClass.findFirst({
    where: {
      id: liveClassId,
      classId: student.classId,
      isActive: true,
    },

    include: {
      teacher: true,
      class: true,
      subject: true,
    },
  });

  if (!liveClass) {
    throw new Error("You are not allowed to access this class");
  }

  await prisma.attendance.upsert({
    where: {
      studentId_liveClassId: {
        studentId,
        liveClassId: liveClass.id,
      },
    },

    update: {},

    create: {
      date: new Date(),

      status: "PRESENT",

      studentId,

      teacherId: liveClass.teacherId,

      liveClassId: liveClass.id,
    },
  });

  return liveClass;
};

export const getLiveClassAttendance = async (
  teacherId: string,
  liveClassId: string,
) => {
  const liveClass = await prisma.liveClass.findFirst({
    where: {
      id: liveClassId,
      teacherId,
    },
  });

  if (!liveClass) {
    throw new Error("Live class not found");
  }

  return prisma.attendance.findMany({
    where: {
      liveClassId,
    },

    include: {
      student: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getLiveClassStats = async (teacherId: string) => {
  const now = new Date();

  const totalClasses = await prisma.liveClass.count({
    where: {
      teacherId,
    },
  });

  const upcomingClasses = await prisma.liveClass.count({
    where: {
      teacherId,
      startTime: {
        gt: now,
      },
    },
  });

  const completedClasses = await prisma.liveClass.count({
    where: {
      teacherId,
      endTime: {
        lt: now,
      },
    },
  });

  const totalAttendance = await prisma.attendance.count({
    where: {
      teacherId,
      liveClassId: {
        not: null,
      },
    },
  });

  return {
    totalClasses,
    upcomingClasses,
    completedClasses,
    totalAttendance,
  };
};
