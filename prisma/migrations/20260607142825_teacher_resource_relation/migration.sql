-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "teacherId" TEXT;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
