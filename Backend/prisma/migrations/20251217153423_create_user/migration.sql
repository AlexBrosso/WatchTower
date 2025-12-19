/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
DROP COLUMN "name",
ADD COLUMN     "imageUrl" TEXT;

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
