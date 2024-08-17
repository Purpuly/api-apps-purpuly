/*
  Warnings:

  - You are about to drop the column `security_id` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the `ApplicationSecurity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `security_webhook_is_enabled` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security_webhook_url` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_security_id_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "security_id",
ADD COLUMN     "security_webhook_is_enabled" BOOLEAN NOT NULL,
ADD COLUMN     "security_webhook_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "ApplicationSecurity";
