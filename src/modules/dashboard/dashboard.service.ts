import { prisma } from "../../config/prisma";

export const getTeacherDashboard = async (teacherId: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      id: teacherId,
    },

    include: {
      subjects: true,
      classes: true,
    },
  });

  const assignments = await prisma.assignment.count({
    where: {
      teacherId,
    },
  });

  const tests = await prisma.test.count({
    where: {
      teacherId,
    },
  });

  const liveClasses = await prisma.liveClass.count({
    where: {
      teacherId,
    },
  });

  const recentNotices = await prisma.notice.findMany({
    take: 5,

    orderBy: {
      createdAt: "desc",
    },
  });

  const students = await prisma.student.count({
    where: {
      teacherId,
    },
  });

  return {
    subjects: teacher?.subjects.length || 0,

    classes: teacher?.classes.length || 0,

    assignments,

    tests,

    students,

    liveClasses,

    recentNotices,
  };
};

export const getAdminDashboard = async () => {
  const totalStudents = await prisma.student.count();

  const totalTeachers = await prisma.teacher.count();

  const totalAssignments = await prisma.assignment.count();

  const totalTests = await prisma.test.count();

  const totalNotices = await prisma.notice.count();

  const totalClasses = await prisma.class.count();

  const totalSubject = await prisma.subject.count();

  const upcomingLiveClasses = await prisma.liveClass.count({
    where: {
      startTime: {
        gte: new Date(),
      },
    },
  });

  return {
    totalStudents,
    totalTeachers,
    totalAssignments,
    totalTests,
    totalNotices,
    upcomingLiveClasses,
    totalClasses,
    totalSubject,
  };
};

export const getStudentDashboard = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },

    include: {
      board: true,
      class: true,
    },
  });

  const attendances = await prisma.attendance.findMany({
    where: {
      studentId,
    },
  });

  const totalAttendance = attendances.length;

  const presentAttendance = attendances.filter(
    (attendance) => attendance.status === "PRESENT",
  ).length;

  const attendancePercentage =
    totalAttendance > 0
      ? Number(((presentAttendance / totalAttendance) * 100).toFixed(2))
      : 0;

  const assignmentsSubmitted = await prisma.assignmentSubmission.count({
    where: {
      studentId,
    },
  });

  const totalAssignments = await prisma.assignment.count();

  const assignmentsPending = totalAssignments - assignmentsSubmitted;

  const testsAttempted = await prisma.testAttempt.count({
    where: {
      studentId,
    },
  });

  const testScores = await prisma.testAttempt.findMany({
    where: {
      studentId,
    },
  });

  const averageScore =
    testScores.length > 0
      ? Number(
          (
            testScores.reduce((sum, test) => sum + test.score, 0) /
            testScores.length
          ).toFixed(2),
        )
      : 0;

  const upcomingClasses = await prisma.liveClass.findMany({
    where: {
      startTime: {
        gte: new Date(),
      },

      isActive: true,
    },

    take: 5,

    orderBy: {
      startTime: "asc",
    },
  });

  const recentNotices = await prisma.notice.findMany({
    take: 5,

    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    student: {
      name: student?.name,
      studentId: student?.studentId,
      photo: student?.photo,
      class: student?.class.name,
      board: student?.board.name,
    },
    attendancePercentage,

    assignmentsSubmitted,
    assignmentsPending,

    testsAttempted,

    averageScore,

    upcomingClasses,

    recentNotices,
  };
};
