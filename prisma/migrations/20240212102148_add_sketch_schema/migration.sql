/*
  Warnings:

  - You are about to drop the column `sketches` on the `DesignPiece` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JobTarget" AS ENUM ('DESIGNER', 'MANUFACTURER');

-- CreateEnum
CREATE TYPE "SketchView" AS ENUM ('FRONT', 'SIDE1', 'SIDE2', 'BACK');

-- AlterTable
ALTER TABLE "DesignPiece" DROP COLUMN "sketches";

-- CreateTable
CREATE TABLE "Sketch" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "designId" TEXT NOT NULL,
    "view" "SketchView" NOT NULL,

    CONSTRAINT "Sketch_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Job" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "designId" TEXT NOT NULL,
    "target" "JobTarget" NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sketch_id_key" ON "Sketch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Job_id_key" ON "Job"("id");

-- AddForeignKey
ALTER TABLE "Sketch" ADD CONSTRAINT "Sketch_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
