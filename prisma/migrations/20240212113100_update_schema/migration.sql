/*
  Warnings:

  - You are about to drop the column `preDesignedPrints` on the `DesignPiece` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "preDesignedPrints" TEXT[];

-- AlterTable
ALTER TABLE "DesignPiece" DROP COLUMN "preDesignedPrints";
