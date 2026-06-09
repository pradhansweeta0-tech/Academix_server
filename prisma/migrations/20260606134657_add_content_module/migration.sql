/*
  Warnings:

  - A unique constraint covering the columns `[chapterNo,subjectId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapterNo` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('NOTE', 'VIDEO', 'ASSIGNMENT', 'RESOURCE');

-- DropIndex
DROP INDEX "Chapter_name_subjectId_key";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "chapterNo" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ContentType" NOT NULL,
    "chapterId" TEXT NOT NULL,
    "fileUrl" TEXT,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_chapterNo_subjectId_key" ON "Chapter"("chapterNo", "subjectId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
