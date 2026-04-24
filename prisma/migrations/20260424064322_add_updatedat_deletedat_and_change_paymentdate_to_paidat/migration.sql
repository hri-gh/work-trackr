/*
  Warnings:

  - You are about to drop the column `paymentDate` on the `work_entries` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `work_entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `workers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_entries" DROP COLUMN "paymentDate",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "workers" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
