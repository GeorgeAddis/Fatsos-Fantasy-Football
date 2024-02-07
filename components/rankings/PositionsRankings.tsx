// components/rankings/PositionsRankings.tsx
import React, { useState, useEffect, FC } from 'react';
import { getRankingLimit, RankingType, PositionType } from './rankingLimits';

interface Ranking {
  rank: string;
  player: {
    fullName: string;
    position: PositionType;
    team: string;
  };
  tier: string;
}

interface PositionsRankingsProps {
  rankingType: RankingType;
  position: PositionType;
}

const PositionsRankings: FC<PositionsRankingsProps> = ({ rankingType, position }) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPositionsRankings = async () => {
      try {
        const limit = getRankingLimit(rankingType, position);
        const positionLower = position.toLowerCase();
        const url = `/api/sheets/${rankingType}-${positionLower}?limit=${limit}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const rawData = await response.json();
        // Include tier extraction in the transformation
        const transformedData = rawData.slice(1).map((row: string[]) => ({
          rank: row[0],
          player: {
            fullName: row[1],
            position: position,
            team: row[2],
          },
          tier: row[3],
        }));

        setRankings(transformedData);
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

  let lastTier = '';

  return (
    <div className="table-container">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player Name</th>
            <th>Team</th>
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
                    <td colSpan={3}> {/* Adjust colspan if needed */}
                      Tier {ranking.tier}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>{ranking.rank}</td>
                  <td>{ranking.player.fullName}</td>
                  <td>{ranking.player.team}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsRankings;
