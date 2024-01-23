// components/rankings/rankingLimits.ts

export type RankingType = 'Redraft' | 'Dynasty';
export type PositionType = 'QB' | 'RB' | 'WR' | 'TE'; 


export type RankingPositionKey = `${RankingType}-${PositionType}` | 'Redraft-K' | 'Redraft-DEF';

export const RANKING_TYPE_LIMITS: Record<RankingType, number> = {
  Redraft: 200, // Total limit for redraft rankings across all positions
  Dynasty: 400, // Total limit for dynasty rankings across all positions
};

export const RANKING_LIMITS: Record<RankingPositionKey, number> = {
  'Redraft-QB': 24,
  'Redraft-RB': 48,
  'Redraft-WR': 72,
  'Redraft-TE': 24,
  'Redraft-K': 24,
  'Redraft-DEF': 24,
  'Dynasty-QB': 48,
  'Dynasty-RB': 96,
  'Dynasty-WR': 144,
  'Dynasty-TE': 48,
  // Note: No entries for dynasty kickers and defenses
};

export const getRankingLimit = (rankingType: RankingType, position: PositionType): number => {
  const key = `${rankingType}-${position}` as RankingPositionKey;
  return RANKING_LIMITS[key] || (rankingType === 'Dynasty' ? 400 : 200);
};
