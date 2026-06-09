/*
  Warnings:

  - Added the required column `classId` to the `LiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `LiveClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LiveClass" ADD COLUMN     "classId" TEXT NOT NULL,
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LiveClass" ADD CONSTRAINT "LiveClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveClass" ADD CONSTRAINT "LiveClass_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
