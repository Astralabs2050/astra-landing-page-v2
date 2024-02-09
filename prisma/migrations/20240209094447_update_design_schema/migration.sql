/*
  Warnings:

  - Added the required column `brandId` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Made the column `designId` on table `DesignPiece` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DesignPiece" DROP CONSTRAINT "DesignPiece_designId_fkey";

-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "brandId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DesignPiece" ALTER COLUMN "designId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("ownerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignPiece" ADD CONSTRAINT "DesignPiece_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
