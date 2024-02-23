-- CreateTable
CREATE TABLE "CreatorSkill" (
    "key" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "CreatorSkill_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "CreatorWork" (
    "key" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "Tags" TEXT[],
    "shots" TEXT[],
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "CreatorWork_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "key" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "_CreatorProfileToCreatorSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CreatorSkill_title_key" ON "CreatorSkill"("title");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_id_key" ON "JobApplication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CreatorProfileToCreatorSkill_AB_unique" ON "_CreatorProfileToCreatorSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CreatorProfileToCreatorSkill_B_index" ON "_CreatorProfileToCreatorSkill"("B");

-- AddForeignKey
ALTER TABLE "CreatorWork" ADD CONSTRAINT "CreatorWork_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "CreatorProfile"("ownerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "CreatorProfile"("ownerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorProfileToCreatorSkill" ADD CONSTRAINT "_CreatorProfileToCreatorSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "CreatorProfile"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatorProfileToCreatorSkill" ADD CONSTRAINT "_CreatorProfileToCreatorSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "CreatorSkill"("key") ON DELETE CASCADE ON UPDATE CASCADE;
