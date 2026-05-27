/*
  Warnings:

  - Changed the type of `category` on the `SessionDomain` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DomainCategory" AS ENUM ('PRODUCTIVE', 'SUPPORT', 'LEARNING', 'NEUTRAL', 'SOCIAL', 'DISTRACTION');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "activeDomainsCount" INTEGER,
ADD COLUMN     "averageInteractionRate" DOUBLE PRECISION,
ADD COLUMN     "totalInteractionTime" DOUBLE PRECISION,
ADD COLUMN     "totalInteractions" INTEGER;

-- AlterTable
ALTER TABLE "SessionDomain" DROP COLUMN "category",
ADD COLUMN     "category" "DomainCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "SessionDomain_category_idx" ON "SessionDomain"("category");
