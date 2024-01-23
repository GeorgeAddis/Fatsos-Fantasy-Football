// components/rankings/PositionsRankings.tsx
import React, { useState, useEffect } from 'react';
import { getRankingLimit, RankingType, PositionType } from './rankingLimits';


interface Ranking {
  rank: number;
  player: {
    fullName: string;
    position: string;
    team: string;
  };
}

const PositionsRankings = ({ rankingType, position }: { rankingType: RankingType; position: PositionType }) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPositionsRankings = async () => {
      try {
        const limit = getRankingLimit(rankingType, position);

        const response = await fetch(`/api/rankings/${rankingType}/${position}?limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const data = await response.json();
        setRankings(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPositionsRankings();
  }, [rankingType, position]);

  if (loading) return <div className="flex justify-center items-center">Loading...</div>;
  if (error) return <div className="flex justify-center items-center">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h2>{position} Rankings for {rankingType}</h2>
      <ul className="list-none">
        {rankings.map((ranking) => (
          <li key={ranking.rank} className="text-center">
            {ranking.rank} - {ranking.player.fullName} ({ranking.player.position} - {ranking.player.team})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PositionsRankings;
