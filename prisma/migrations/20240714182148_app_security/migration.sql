-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "security_id" TEXT;

-- CreateTable
CREATE TABLE "ApplicationSecurity" (
    "id" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "private_key" TEXT NOT NULL,
    "webhook_is_enabled" BOOLEAN NOT NULL,
    "webhook_url" TEXT NOT NULL,

    CONSTRAINT "ApplicationSecurity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationSecurity_app_id_key" ON "ApplicationSecurity"("app_id");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "ApplicationSecurity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
