/*
  Warnings:

  - Added the required column `type` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "type" TEXT NOT NULL;
