// components/AllPositionsRankings.tsx
import React, { useState, useEffect } from 'react';
import { RANKING_TYPE_LIMITS, RankingType } from './rankingLimits';

interface Ranking {
  rank: number;
  player: {
    fullName: string;
    position: string;
    team: string;
  };
}

const AllPositionsRankings = ({ rankingType }: { rankingType: RankingType }) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAllPositionsRankings = async () => {
      try {
        // Use the ranking type to get the appropriate limit
        const limit = RANKING_TYPE_LIMITS[rankingType];

        const response = await fetch(`/api/rankings/all?rankingType=${rankingType}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const data = await response.json();
        console.log("TEST");
        console.log(data);
        setRankings(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPositionsRankings();
  }, [rankingType]);

  if (loading) return <div className="flex justify-center items-center">Loading...</div>;
  if (error) return <div className="flex justify-center items-center">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h2>Rankings for {rankingType}</h2>
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

export default AllPositionsRankings;
