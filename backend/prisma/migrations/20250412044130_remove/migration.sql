/*
  Warnings:

  - You are about to drop the column `type` on the `Questionnaire` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questionnaire" DROP COLUMN "type";

-- DropEnum
DROP TYPE "QuestionnaireType";
