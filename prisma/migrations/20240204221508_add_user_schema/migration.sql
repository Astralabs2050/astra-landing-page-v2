/*
  Warnings:

  - You are about to drop the column `role` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "role";

-- DropTable
DROP TABLE "Creator";

-- CreateTable
CREATE TABLE "User" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" "RoleId" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "CreatorProfile" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "CreatorProfile_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorProfile_id_key" ON "CreatorProfile"("id");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorProfile" ADD CONSTRAINT "CreatorProfile_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
