/*
  Warnings:

  - You are about to drop the column `riceKg` on the `work_entries` table. All the data in the column will be lost.
  - Added the required column `grainKg` to the `work_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_entries" DROP COLUMN "riceKg",
ADD COLUMN     "grainKg" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentDate" TIMESTAMP(3);
