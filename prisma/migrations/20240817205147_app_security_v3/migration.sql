/*
  Warnings:

  - Added the required column `security_webhook_secret` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "security_webhook_secret" TEXT NOT NULL;
