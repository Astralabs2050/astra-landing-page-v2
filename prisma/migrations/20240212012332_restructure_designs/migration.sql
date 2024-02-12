/*
  Warnings:

  - You are about to drop the `DesignInspiration` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[txHash]` on the table `Design` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prompt` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DesignInspiration" DROP CONSTRAINT "DesignInspiration_brandId_fkey";

-- DropForeignKey
ALTER TABLE "DesignInspiration" DROP CONSTRAINT "DesignInspiration_designId_fkey";

-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "imagePrompt" TEXT,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "promptResults" TEXT[],
ADD COLUMN     "txHash" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "DesignInspiration";

-- CreateIndex
CREATE UNIQUE INDEX "Design_txHash_key" ON "Design"("txHash");
