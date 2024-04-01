/*
  Warnings:

  - You are about to drop the column `location` on the `CreatorProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `CreatorSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `CreatorWork` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[designId,target]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `CreatorSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `CreatorWork` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `target` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CreatorType" AS ENUM ('DESIGNER', 'MANUFACTURER');

-- AlterTable
ALTER TABLE "CreatorProfile" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "CreatorSkill" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CreatorWork" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "target",
ADD COLUMN     "target" "CreatorType" NOT NULL;

-- DropEnum
DROP TYPE "JobTarget";

-- CreateIndex
CREATE UNIQUE INDEX "CreatorSkill_id_key" ON "CreatorSkill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorWork_id_key" ON "CreatorWork"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Job_designId_target_key" ON "Job"("designId", "target");
