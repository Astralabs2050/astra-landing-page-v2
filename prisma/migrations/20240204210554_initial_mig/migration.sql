-- CreateEnum
CREATE TYPE "RoleId" AS ENUM ('BRAND', 'DESIGNER', 'MANUFACTURER');

-- CreateTable
CREATE TABLE "Role" (
    "id" "RoleId" NOT NULL,
    "key" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Brand" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "role" "RoleId" NOT NULL DEFAULT 'BRAND',

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Creator" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "role" "RoleId" NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Look" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Look_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_id_key" ON "Brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_id_key" ON "Creator"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Look_id_key" ON "Look"("id");
