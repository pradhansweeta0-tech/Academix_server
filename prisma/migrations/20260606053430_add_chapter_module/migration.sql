/*
  Warnings:

  - A unique constraint covering the columns `[name,boardId,classId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_name_subjectId_key" ON "Chapter"("name", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_boardId_classId_key" ON "Subject"("name", "boardId", "classId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
