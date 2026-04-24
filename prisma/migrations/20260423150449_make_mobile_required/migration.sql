/*
  Warnings:

  - Made the column `mobile` on table `workers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "workers" ALTER COLUMN "mobile" SET NOT NULL;
