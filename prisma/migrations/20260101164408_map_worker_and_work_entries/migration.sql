/*
  Warnings:

  - You are about to drop the `WorkEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Worker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkEntry" DROP CONSTRAINT "WorkEntry_workerId_fkey";

-- DropTable
DROP TABLE "WorkEntry";

-- DropTable
DROP TABLE "Worker";

-- CreateTable
CREATE TABLE "workers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_entries" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "riceKg" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "note" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "work_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "work_entries_workerId_idx" ON "work_entries"("workerId");

-- CreateIndex
CREATE INDEX "work_entries_date_idx" ON "work_entries"("date");

-- AddForeignKey
ALTER TABLE "work_entries" ADD CONSTRAINT "work_entries_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
