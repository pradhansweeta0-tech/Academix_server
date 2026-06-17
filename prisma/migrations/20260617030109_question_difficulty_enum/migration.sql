/*
  Warnings:

  - Added the required column `boardId` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "difficulty" "DifficultyLevel",
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "optionAImage" TEXT,
ADD COLUMN     "optionBImage" TEXT,
ADD COLUMN     "optionCImage" TEXT,
ADD COLUMN     "optionDImage" TEXT,
ADD COLUMN     "questionImage" TEXT;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "boardId" TEXT NOT NULL,
ADD COLUMN     "chapterId" TEXT,
ADD COLUMN     "classId" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "negativeMarks" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "passingMarks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shuffleOptions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startTime" TIMESTAMP(3),
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
