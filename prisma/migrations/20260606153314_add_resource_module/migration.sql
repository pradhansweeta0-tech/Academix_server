/*
  Warnings:

  - You are about to drop the column `duration` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Content` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('PDF', 'IMAGE', 'VIDEO', 'PPT', 'EXCEL', 'DOC', 'ASSIGNMENT', 'LINK');

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "duration",
DROP COLUMN "fileUrl",
DROP COLUMN "thumbnail",
DROP COLUMN "type";

-- DropEnum
DROP TYPE "ContentType";

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "fileUrl" TEXT,
    "youtubeUrl" TEXT,
    "fileSize" INTEGER,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
