/*
  Warnings:

  - A unique constraint covering the columns `[studentId,liveClassId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Attendance_studentId_date_key";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "liveClassId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_liveClassId_key" ON "Attendance"("studentId", "liveClassId");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_liveClassId_fkey" FOREIGN KEY ("liveClassId") REFERENCES "LiveClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;
