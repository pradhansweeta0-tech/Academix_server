-- CreateEnum
CREATE TYPE "NoticeAudience" AS ENUM ('ALL', 'STUDENTS', 'TEACHERS');

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audience" "NoticeAudience" NOT NULL DEFAULT 'ALL',
    "createdBy" TEXT NOT NULL,
    "creatorRole" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);
