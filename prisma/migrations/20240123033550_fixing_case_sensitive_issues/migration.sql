/*
  Warnings:

  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fullName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `Player` table. All the data in the column will be lost.
  - The primary key for the `Ranking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerId` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `rankingId` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Ranking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PlayerId,Type]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `FullName` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rank` to the `Ranking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `Ranking` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_playerId_fkey";

-- DropIndex
DROP INDEX "Ranking_playerId_type_key";

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "fullName",
DROP COLUMN "playerId",
DROP COLUMN "position",
DROP COLUMN "team",
ADD COLUMN     "FullName" VARCHAR(255) NOT NULL,
ADD COLUMN     "PlayerId" SERIAL NOT NULL,
ADD COLUMN     "Position" VARCHAR(50),
ADD COLUMN     "Team" VARCHAR(100),
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("PlayerId");

UPDATE "Player" SET "FullName" = 'Default Name' WHERE "FullName" IS NULL;

-- AlterTable
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_pkey",
DROP COLUMN "playerId",
DROP COLUMN "rank",
DROP COLUMN "rankingId",
DROP COLUMN "type",
ADD COLUMN     "PlayerId" INTEGER,
ADD COLUMN     "Rank" INTEGER NOT NULL,
ADD COLUMN     "RankingId" SERIAL NOT NULL,
ADD COLUMN     "Type" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "Ranking_pkey" PRIMARY KEY ("RankingId");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_PlayerId_Type_key" ON "Ranking"("PlayerId", "Type");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_PlayerId_fkey" FOREIGN KEY ("PlayerId") REFERENCES "Player"("PlayerId") ON DELETE SET NULL ON UPDATE CASCADE;
