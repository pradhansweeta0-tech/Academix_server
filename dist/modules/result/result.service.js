"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyResult = void 0;
const prisma_1 = require("../../config/prisma");
const getMyResult = async (studentId) => {
    const student = await prisma_1.prisma.student.findUnique({
        where: {
            id: studentId,
        },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    const attendances = await prisma_1.prisma.attendance.findMany({
        where: {
            studentId,
        },
    });
    const submissions = await prisma_1.prisma.assignmentSubmission.findMany({
        where: {
            studentId,
        },
        include: {
            assignment: true,
        },
    });
    const testAttempts = await prisma_1.prisma.testAttempt.findMany({
        where: {
            studentId,
        },
        include: {
            test: true,
        },
    });
    const totalAttendance = attendances.length;
    const presentAttendance = attendances.filter((attendance) => attendance.status === "PRESENT").length;
    const attendancePercentage = totalAttendance > 0
        ? ((presentAttendance / totalAttendance) * 100).toFixed(2)
        : "0";
    const assignmentMarks = submissions.reduce((sum, submission) => sum + (submission.marks || 0), 0);
    const testMarks = testAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
    return {
        student: {
            id: student.id,
            studentId: student.studentId,
            name: student.name,
        },
        attendancePercentage,
        assignments: submissions,
        tests: testAttempts,
        totalAssignmentMarks: assignmentMarks,
        totalTestMarks: testMarks,
        overallScore: assignmentMarks + testMarks,
    };
};
exports.getMyResult = getMyResult;
