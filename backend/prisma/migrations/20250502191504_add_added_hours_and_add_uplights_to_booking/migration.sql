/*
  Warnings:

  - Added the required column `addUplights` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "addUplights" BOOLEAN NOT NULL,
ADD COLUMN     "addedHours" INTEGER NOT NULL DEFAULT 0;
