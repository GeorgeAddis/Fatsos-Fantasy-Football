// components/rankings/rankingLimits.ts

// If changing back to vercel DB will need to capitalise Redraft and Dynasty

export type RankingType = 'redraft' | 'dynasty';
export type PositionType = 'QB' | 'RB' | 'WR' | 'TE'; 


export type RankingPositionKey = `${RankingType}-${PositionType}` | 'redraft-K' | 'redraft-DEF';

export const RANKING_TYPE_LIMITS: Record<RankingType, number> = {
  redraft: 200, // Total limit for redraft rankings across all positions
  dynasty: 400, // Total limit for dynasty rankings across all positions
};

export const RANKING_LIMITS: Record<RankingPositionKey, number> = {
  'redraft-QB': 24,
  'redraft-RB': 48,
  'redraft-WR': 72,
  'redraft-TE': 24,
  'redraft-K': 24,
  'redraft-DEF': 24,
  'dynasty-QB': 48,
  'dynasty-RB': 96,
  'dynasty-WR': 144,
  'dynasty-TE': 48,
  // Note: No entries for dynasty kickers and defenses
};

export const getRankingLimit = (rankingType: RankingType, position: PositionType): number => {
  const key = `${rankingType}-${position}` as RankingPositionKey;
  return RANKING_LIMITS[key] || (rankingType === 'dynasty' ? 400 : 200);
};
