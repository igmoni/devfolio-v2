/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Sponsor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "claimedAt" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "paymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_paymentId_key" ON "Sponsor"("paymentId");

-- CreateIndex
CREATE INDEX "Sponsor_email_idx" ON "Sponsor"("email");
