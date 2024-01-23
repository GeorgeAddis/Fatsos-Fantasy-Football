import React from 'react';

type Position = 'Overall' | 'QB' | 'RB' | 'WR' | 'TE';
type RankingsPanelProps = {
  selectedPosition: Position;
  onSelectPosition: (position: Position) => void;
};

const RankingsPanel: React.FC<RankingsPanelProps> = ({
  selectedPosition,
  onSelectPosition,
}) => {
  return (
      <div className="flex flex-col w-full">
          {(['Overall', 'QB', 'RB', 'WR', 'TE'] as Position[]).map((position) => (
              <button
                  key={position}
                  onClick={() => onSelectPosition(position)}
                  className={`custom-button ${
                      selectedPosition === position ? 'selected' : ''
                  }`}
              >
                  {position}
              </button>
          ))}
      </div>
  );
};


export default RankingsPanel;
