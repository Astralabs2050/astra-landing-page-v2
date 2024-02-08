/*
  Warnings:

  - You are about to drop the column `id` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `CreatorProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId]` on the table `CreatorProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bio` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `CreatorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Brand_id_key";

-- DropIndex
DROP INDEX "CreatorProfile_id_key";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "id",
DROP COLUMN "location",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CreatorProfile" DROP COLUMN "id",
ADD COLUMN     "bio" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "admin1" TEXT,
    "zip" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_ownerId_key" ON "Brand"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorProfile_ownerId_key" ON "CreatorProfile"("ownerId");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
