-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_expiry" TIMESTAMP(3),
ADD COLUMN     "temp_two_factor_secret" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "two_factor_secret" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
