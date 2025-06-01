-- CreateTable
CREATE TABLE "journal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journalEntry" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "journalId" INTEGER NOT NULL,

    CONSTRAINT "journalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meditation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "transcript" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meditation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habitLog" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "habitLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "habitLog_habitId_date_key" ON "habitLog"("habitId", "date");

-- AddForeignKey
ALTER TABLE "journalEntry" ADD CONSTRAINT "journalEntry_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habitLog" ADD CONSTRAINT "habitLog_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
