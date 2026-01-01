/*
  Warnings:

  - Added the required column `riceKg` to the `WorkEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkEntry" ADD COLUMN     "riceKg" DOUBLE PRECISION NOT NULL;
