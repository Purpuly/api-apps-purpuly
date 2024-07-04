/*
  Warnings:

  - You are about to drop the column `isActive` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `appId` on the `ResetPassword` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ResetPassword` table. All the data in the column will be lost.
  - Added the required column `app_id` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ResetPassword" DROP COLUMN "appId",
DROP COLUMN "userId",
ADD COLUMN     "app_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;
