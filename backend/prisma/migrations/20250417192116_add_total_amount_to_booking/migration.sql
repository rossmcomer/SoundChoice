/*
  Warnings:

  - Added the required column `totalAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;
