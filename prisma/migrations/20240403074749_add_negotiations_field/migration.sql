/*
  Warnings:

  - Made the column `createdAt` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "openToNegotiations" BOOLEAN NOT NULL DEFAULT false;
