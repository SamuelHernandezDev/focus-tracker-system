/*
  Warnings:

  - The values [AWAY] on the enum `AttentionState` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `awayTime` on the `Session` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttentionState_new" AS ENUM ('ATTENTIVE', 'DISTRACTED', 'PHONE', 'ABSENT');
ALTER TABLE "AttentionSegment" ALTER COLUMN "state" TYPE "AttentionState_new" USING ("state"::text::"AttentionState_new");
ALTER TYPE "AttentionState" RENAME TO "AttentionState_old";
ALTER TYPE "AttentionState_new" RENAME TO "AttentionState";
DROP TYPE "public"."AttentionState_old";
COMMIT;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "awayTime",
ADD COLUMN     "absentTime" DOUBLE PRECISION;
