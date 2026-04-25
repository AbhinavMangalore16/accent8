/*
  Warnings:

  - You are about to drop the column `r2ObjectKey` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `r2ObjectKey` on the `Voice` table. All the data in the column will be lost.
  - Added the required column `s3ObjectKey` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "r2ObjectKey",
ADD COLUMN     "s3ObjectKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "r2ObjectKey",
ADD COLUMN     "s3ObjectKey" TEXT;
