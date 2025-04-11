-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('wedding', 'corporate', 'birthday', 'barBatMitzvah', 'other');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'wedding';
