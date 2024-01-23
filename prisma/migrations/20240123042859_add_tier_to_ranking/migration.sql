/*
  Warnings:

  - Made the column `Position` on table `Player` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Tier` to the `Ranking` table without a default value. This is not possible if the table is not empty.
  - Made the column `PlayerId` on table `Ranking` required. This step will fail if there are existing NULL values in that column.

*/

-- Delete existing data from Ranking and Player tables
DELETE FROM "Ranking";
DELETE FROM "Player";

-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_PlayerId_fkey";

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "Position" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ranking" ADD COLUMN     "Tier" INTEGER NOT NULL,
ALTER COLUMN "PlayerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_PlayerId_fkey" FOREIGN KEY ("PlayerId") REFERENCES "Player"("PlayerId") ON DELETE RESTRICT ON UPDATE CASCADE;
