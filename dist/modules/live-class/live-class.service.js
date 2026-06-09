"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiveClassStats = exports.getLiveClassAttendance = exports.joinLiveClass = exports.getStudentLiveClasses = exports.getUpcomingClasses = exports.deleteLiveClass = exports.updateLiveClass = exports.getLiveClassById = exports.getLiveClasses = exports.createLiveClass = void 0;
const prisma_1 = require("../../config/prisma");
const email_service_1 = require("../../services/email/email.service");
const live_class_template_1 = require("../../services/email/templates/live-class.template");
const createLiveClass = async (teacherId, payload) => {
    const liveClass = await prisma_1.prisma.liveClass.create({
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
    const students = await prisma_1.prisma.student.findMany({
        where: {
            classId: payload.classId,
            isActive: true,
        },
    });
    for (const student of students) {
        if (!student.email)
            continue;
        Promise.all(students
            .filter((student) => student.email)
            .map((student) => (0, email_service_1.sendEmail)(student.email, `New Live Class - ${liveClass.title}`, (0, live_class_template_1.liveClassTemplate)(student.name, liveClass.title, liveClass.subject.name, liveClass.teacher.name, liveClass.meetingLink, liveClass.startTime))));
    }
    return liveClass;
};
exports.createLiveClass = createLiveClass;
const getLiveClasses = async (teacherId) => {
    return prisma_1.prisma.liveClass.findMany({
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
exports.getLiveClasses = getLiveClasses;
const getLiveClassById = async (teacherId, id) => {
    return prisma_1.prisma.liveClass.findFirst({
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
exports.getLiveClassById = getLiveClassById;
const updateLiveClass = async (teacherId, id, payload) => {
    const liveClass = await prisma_1.prisma.liveClass.findFirst({
        where: {
            id,
            teacherId,
        },
    });
    if (!liveClass) {
        throw new Error("Live Class not found");
    }
    return prisma_1.prisma.liveClass.update({
        where: {
            id,
        },
        data: payload,
    });
};
exports.updateLiveClass = updateLiveClass;
const deleteLiveClass = async (teacherId, id) => {
    const liveClass = await prisma_1.prisma.liveClass.findFirst({
        where: {
            id,
            teacherId,
        },
    });
    if (!liveClass) {
        throw new Error("Live Class not found");
    }
    return prisma_1.prisma.liveClass.delete({
        where: {
            id,
        },
    });
};
exports.deleteLiveClass = deleteLiveClass;
const getUpcomingClasses = async () => {
    return prisma_1.prisma.liveClass.findMany({
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
exports.getUpcomingClasses = getUpcomingClasses;
const getStudentLiveClasses = async (studentId) => {
    const student = await prisma_1.prisma.student.findUnique({
        where: {
            id: studentId,
        },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    return prisma_1.prisma.liveClass.findMany({
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
exports.getStudentLiveClasses = getStudentLiveClasses;
const joinLiveClass = async (studentId, liveClassId) => {
    const student = await prisma_1.prisma.student.findUnique({
        where: {
            id: studentId,
        },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    const liveClass = await prisma_1.prisma.liveClass.findFirst({
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
    await prisma_1.prisma.attendance.upsert({
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
exports.joinLiveClass = joinLiveClass;
const getLiveClassAttendance = async (teacherId, liveClassId) => {
    const liveClass = await prisma_1.prisma.liveClass.findFirst({
        where: {
            id: liveClassId,
            teacherId,
        },
    });
    if (!liveClass) {
        throw new Error("Live class not found");
    }
    return prisma_1.prisma.attendance.findMany({
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
exports.getLiveClassAttendance = getLiveClassAttendance;
const getLiveClassStats = async (teacherId) => {
    const now = new Date();
    const totalClasses = await prisma_1.prisma.liveClass.count({
        where: {
            teacherId,
        },
    });
    const upcomingClasses = await prisma_1.prisma.liveClass.count({
        where: {
            teacherId,
            startTime: {
                gt: now,
            },
        },
    });
    const completedClasses = await prisma_1.prisma.liveClass.count({
        where: {
            teacherId,
            endTime: {
                lt: now,
            },
        },
    });
    const totalAttendance = await prisma_1.prisma.attendance.count({
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
exports.getLiveClassStats = getLiveClassStats;
