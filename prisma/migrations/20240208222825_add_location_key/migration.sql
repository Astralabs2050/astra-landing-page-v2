-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "key" SERIAL NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("key");
