-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ACTIVE', 'IDLE', 'TAB_CHANGE');

-- CreateEnum
CREATE TYPE "AttentionState" AS ENUM ('ATTENTIVE', 'DISTRACTED', 'PHONE', 'AWAY');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "allowedSites" TEXT[],
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "focusTime" DOUBLE PRECISION,
    "idleTime" DOUBLE PRECISION,
    "interruptions" INTEGER,
    "distractions" INTEGER,
    "score" INTEGER,
    "attentiveTime" DOUBLE PRECISION,
    "distractedTime" DOUBLE PRECISION,
    "phoneTime" DOUBLE PRECISION,
    "awayTime" DOUBLE PRECISION,
    "attentionScore" DOUBLE PRECISION,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "value" TEXT,
    "timestamp" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttentionSegment" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "state" "AttentionState" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "confidence" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttentionSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionDomain" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "relevant" BOOLEAN NOT NULL,
    "isDistraction" BOOLEAN NOT NULL,
    "aiConfidence" DOUBLE PRECISION,
    "aiReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionDomain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_sessionId_idx" ON "Event"("sessionId");

-- CreateIndex
CREATE INDEX "AttentionSegment_sessionId_idx" ON "AttentionSegment"("sessionId");

-- CreateIndex
CREATE INDEX "AttentionSegment_state_idx" ON "AttentionSegment"("state");

-- CreateIndex
CREATE INDEX "AttentionSegment_startedAt_idx" ON "AttentionSegment"("startedAt");

-- CreateIndex
CREATE INDEX "SessionDomain_sessionId_idx" ON "SessionDomain"("sessionId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttentionSegment" ADD CONSTRAINT "AttentionSegment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionDomain" ADD CONSTRAINT "SessionDomain_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
