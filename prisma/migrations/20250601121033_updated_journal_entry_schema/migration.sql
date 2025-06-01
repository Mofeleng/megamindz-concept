/*
  Warnings:

  - Added the required column `title` to the `journalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "journalEntry" ADD COLUMN     "title" TEXT NOT NULL;
