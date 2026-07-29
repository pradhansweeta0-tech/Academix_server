import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import { sendEmail } from "../../services/email/email.service";
import { welcomeStudentTemplate } from "../../services/email/templates/welcome-student.template";

export const adminLogin = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  const isMatched = await bcrypt.compare(password, admin.password);

  if (!isMatched) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  const { password: _, ...adminData } = admin;

  return {
    token,
    admin: adminData,
  };
};

export const teacherLogin = async (email: string, password: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      email,
    },
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  const isMatched = await bcrypt.compare(password, teacher.password);

  if (!isMatched) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: teacher.id,
      email: teacher.email,
      role: teacher.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  const { password: _, ...teacherData } = teacher;

  return {
    token,
    teacher: teacherData,
  };
};

export const studentLogin = async (studentId: string, password: string) => {
  const student = await prisma.student.findUnique({
    where: {
      studentId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const isMatched = await bcrypt.compare(password, student.password);

  if (!isMatched) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: student.id,
      studentId: student.studentId,
      role: student.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  const { password: _, ...studentData } = student;

  return {
    token,
    student: studentData,
  };
};

export const studentSignup = async (payload: any) => {
  try {
    console.log("========== STUDENT SIGNUP ==========");
    console.log("Payload:", payload);

    console.log("Step 1: Checking verified OTP...");
    const verifiedOTP = await prisma.oTP.findFirst({
      where: {
        email: payload.email,
        verified: true,
      },
    });

    if (!verifiedOTP) {
      throw new Error("Email not verified");
    }
    console.log("✅ OTP Verified");

    console.log("Step 2: Checking existing student...");
    const existingStudent = await prisma.student.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingStudent) {
      throw new Error("Student already exists");
    }
    console.log("✅ Student does not exist");

    console.log("Step 3: Finding class...");
    const classData = await prisma.class.findUnique({
      where: {
        id: payload.classId,
      },
    });

    if (!classData) {
      throw new Error("Class not found");
    }
    console.log("✅ Class Found");

    console.log("Step 4: Finding board...");
    const board = await prisma.board.findUnique({
      where: {
        id: payload.boardId,
      },
    });

    console.log("Step 5: Finding active academic session...");
    const session = await prisma.academicSession.findFirst({
      where: {
        status: "ACTIVE",
      },
    });

    if (!board) {
      throw new Error("Board not found");
    }

    if (!session) {
      throw new Error("Active Academic Session not found");
    }

    console.log("✅ Board & Session Found");

    const year = session.name.slice(2, 4);
    const boardCode = board.shortName;

    console.log("Step 6: Finding latest student...");
    const latestStudent = await prisma.student.findFirst({
      where: {
        boardId: payload.boardId,
        academicSessionId: session.id,
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

    console.log("Generated Student ID:", studentId);

    console.log("Step 7: Hashing Password...");
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    console.log("Step 8: Creating Student...");
    const student = await prisma.student.create({
      data: {
        ...payload,
        academicSessionId: session.id,
        studentId,
        password: hashedPassword,
      },
      include: {
        board: true,
        class: true,
        academicSession: true,
      },
    });

    console.log("✅ Student Created");

    console.log("Step 9: Deleting OTP...");
    await prisma.oTP.deleteMany({
      where: {
        email: payload.email,
      },
    });

    console.log("Step 10: Sending Welcome Email...");
    if (student.email) {
      try {
        await sendEmail(
          student.email,
          "Welcome to NBCA",
          welcomeStudentTemplate({
            name: student.name,
            studentId: student.studentId,
            email: student.email,
            board: board.name,
            className: classData.name,
          })
        );

        console.log("✅ Welcome Email Sent");
      } catch (err) {
        console.error("❌ Welcome Email Failed");
        console.error(err);
      }
    }

    const { password, ...studentData } = student;

    const token = jwt.sign(
      {
        id: student.id,
        studentId: student.studentId,
        role: student.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    console.log("🎉 STUDENT SIGNUP COMPLETED");

    return {
      message: "Student registered successfully",
      token,
      student: studentData,
    };
  } catch (error) {
    console.error("❌ STUDENT SIGNUP ERROR");
    console.error(error);
    throw error;
  }
};

export const resetPassword = async (email: string, password: string) => {
  const verifiedOTP = await prisma.oTP.findFirst({
    where: {
      email,
      verified: true,
    },
  });

  if (!verifiedOTP) {
    throw new Error("OTP not verified");
  }

  const student = await prisma.student.findUnique({
    where: {
      email,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.student.update({
    where: {
      email,
    },

    data: {
      password: hashedPassword,
    },
  });

  await prisma.oTP.deleteMany({
    where: {
      email,
    },
  });

  return {
    message: "Password reset successfully",
  };
};
