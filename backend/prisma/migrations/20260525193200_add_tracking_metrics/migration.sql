-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'TRACKING_ACTIVITY';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "keyboardEvents" INTEGER,
ADD COLUMN     "mouseEvents" INTEGER,
ADD COLUMN     "totalClicks" INTEGER;

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE INDEX "Event_timestamp_idx" ON "Event"("timestamp");

-- CreateIndex
CREATE INDEX "SessionDomain_domain_idx" ON "SessionDomain"("domain");

-- CreateIndex
CREATE INDEX "SessionDomain_category_idx" ON "SessionDomain"("category");
