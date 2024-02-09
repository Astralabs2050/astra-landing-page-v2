/*
  Warnings:

  - You are about to drop the column `locationId` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Look` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `CreatorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `CreatorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `CreatorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `CreatorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PieceMaterial" AS ENUM ('JEANS', 'SILK', 'COTTON', 'LINEN', 'WOOL');

-- CreateEnum
CREATE TYPE "PieceType" AS ENUM ('SHIRT', 'SKIRT', 'PANTS', 'JACKET', 'BLOUSE', 'DRESS', 'CAP', 'HEADWARMER');

-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_locationId_fkey";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "locationId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL,
ADD COLUMN     "province1" TEXT,
ADD COLUMN     "province2" TEXT,
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "CreatorProfile" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL,
ADD COLUMN     "province1" TEXT,
ADD COLUMN     "province2" TEXT,
ADD COLUMN     "zip" TEXT;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Look";

-- CreateTable
CREATE TABLE "Design" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "promptResults" TEXT[],

    CONSTRAINT "Design_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "DesignPiece" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "pieceCount" INTEGER NOT NULL,
    "pricePerPiece" INTEGER NOT NULL,
    "sketches" TEXT[],
    "preDesignedPrints" TEXT[],
    "type" "PieceType" NOT NULL,
    "material" "PieceMaterial" NOT NULL,
    "designId" TEXT,

    CONSTRAINT "DesignPiece_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Design_id_key" ON "Design"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DesignPiece_id_key" ON "DesignPiece"("id");

-- AddForeignKey
ALTER TABLE "DesignPiece" ADD CONSTRAINT "DesignPiece_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE SET NULL ON UPDATE CASCADE;
