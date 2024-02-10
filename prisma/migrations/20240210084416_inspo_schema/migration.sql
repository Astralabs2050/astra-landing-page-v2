/*
  Warnings:

  - You are about to drop the column `prompt` on the `Design` table. All the data in the column will be lost.
  - You are about to drop the column `promptResults` on the `Design` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Design" DROP COLUMN "prompt",
DROP COLUMN "promptResults";

-- CreateTable
CREATE TABLE "DesignInspiration" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "designId" TEXT,
    "prompt" TEXT NOT NULL,
    "imagePrompt" TEXT,
    "promptResults" TEXT[],

    CONSTRAINT "DesignInspiration_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "DesignInspiration_id_key" ON "DesignInspiration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DesignInspiration_designId_key" ON "DesignInspiration"("designId");

-- AddForeignKey
ALTER TABLE "DesignInspiration" ADD CONSTRAINT "DesignInspiration_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignInspiration" ADD CONSTRAINT "DesignInspiration_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("ownerId") ON DELETE RESTRICT ON UPDATE CASCADE;
