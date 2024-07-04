-- CreateTable
CREATE TABLE "ResetPassword" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "iat" INTEGER NOT NULL,

    CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id")
);
