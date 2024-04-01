/*
  Warnings:

  - You are about to drop the column `Tags` on the `CreatorWork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CreatorWork" DROP COLUMN "Tags",
ADD COLUMN     "tags" TEXT[];
