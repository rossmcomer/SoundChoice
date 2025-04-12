/*
  Warnings:

  - Added the required column `type` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionnaireType" AS ENUM ('wedding', 'other');

-- AlterTable
ALTER TABLE "Questionnaire" ADD COLUMN     "type" "QuestionnaireType" NOT NULL;
