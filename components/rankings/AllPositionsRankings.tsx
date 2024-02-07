// components/AllPositionsRankings.tsx
import React, { useState, useEffect } from 'react';
import { RANKING_TYPE_LIMITS, RankingType } from './rankingLimits';

interface Ranking {
  rank: string;
  player: {
    fullName: string;
    team: string;
    positionRank: string;
  };
  tier: string; // Make sure this is included as it's part of the data
}

const AllPositionsRankings = ({ rankingType }: { rankingType: RankingType }) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAllPositionsRankings = async () => {
      try {
        const limit = RANKING_TYPE_LIMITS[rankingType];
        const url = `/api/sheets/${rankingType}-overall?limit=${limit}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const rawData = await response.json();

        const transformedData = rawData.slice(1).map((row: string[]) => ({
          rank: row[0],
          player: {
            fullName: row[1],
            team: row[2],
            positionRank: row[3],
          },
          tier: row[4], // Extract tier from the raw data
        }));

        setRankings(transformedData);
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

  let lastTier = '';

  return (
    <div className="table-container">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player Name</th>
            <th>Team</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => {
            const tierChanged = ranking.tier !== lastTier;
            if (tierChanged) lastTier = ranking.tier; // Update lastTier to current tier for next iteration

            return (
              <React.Fragment key={index}>
                {tierChanged && (
                  <tr className="tier-row">
                    <td colSpan={4}>
                      Tier {ranking.tier}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>{ranking.rank}</td>
                  <td>{ranking.player.fullName}</td>
                  <td>{ranking.player.team}</td>
                  <td>{ranking.player.positionRank}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllPositionsRankings;
