/*
  Warnings:

  - The values [failed] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('unpaid', 'depositReceived', 'remainingPaymentFailed', 'paidInFull', 'depositFailed');
ALTER TABLE "Booking" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "paymentStatus" TYPE "PaymentStatus_new" USING ("paymentStatus"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "paymentStatus" SET DEFAULT 'unpaid';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT NOT NULL;
