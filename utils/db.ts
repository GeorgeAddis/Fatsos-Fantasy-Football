// utils/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new player
export const createPlayer = async (data: { fullName: string; position?: string; team?: string }) => {
  return await prisma.player.create({
    data,
  });
};

// Get a player by ID
export const getPlayerById = async (playerId: number) => {
  return await prisma.player.findUnique({
    where: { playerId },
  });
};

// Get all players
export const getAllPlayers = async () => {
  return await prisma.player.findMany();
};

// Update a player
export const updatePlayer = async (playerId: number, data: { fullName?: string; position?: string; team?: string }) => {
  return await prisma.player.update({
    where: { playerId },
    data,
  });
};

// Delete a player
export const deletePlayer = async (playerId: number) => {
  return await prisma.player.delete({
    where: { playerId },
  });
};

// Get all rankings for a specific ranking type and all positions, limited to a number of results
export const getAllPositionsRankings = async (rankingType: string, limit: number) => {
  return await prisma.ranking.findMany({
    where: {
      type: rankingType,
    },
    take: limit,
    orderBy: {
      rank: 'asc', // order by rank ascending
    },
    select: {
      rank: true,
      player: {
        select: {
          fullName: true,
          position: true,
          team: true,
        },
      },
    },
  });
};


// Get all rankings for a specific ranking type and position, limited to a number of results
export const getPositionsRankings = async (
  rankingType: string,
  position: string,
  limit: number
) => {
  return await prisma.ranking.findMany({
    where: {
      type: rankingType,
      player: {
        position: position,
      },
    },
    take: limit,
    orderBy: {
      rank: 'asc',
    },
    select: {
      rank: true,
      player: {
        select: {
          fullName: true,
          position: true,
          team: true,
        },
      },
    },
  });
};
