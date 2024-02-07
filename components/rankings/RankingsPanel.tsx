import React, { useState, useEffect } from 'react';

type Position = 'Overall' | 'QB' | 'RB' | 'WR' | 'TE';
type RankingsPanelProps = {
  selectedPosition: Position;
  onSelectPosition: (position: Position) => void;
};

const RankingsPanel: React.FC<RankingsPanelProps> = ({
  selectedPosition,
  onSelectPosition,
}) => {
  // State to determine if the viewport is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Effect to check the window width and update the `isMobile` state
  useEffect(() => {
    const checkIfMobile = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768); // Or whatever breakpoint you prefer
    };

    // Check on mount and subsequent resizes
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Conditional class based on `isMobile` state
  const containerClass = isMobile ? "flex flex-row flex-wrap justify-center" : "flex flex-col";

  return (
    <div className={containerClass}>
      {(['Overall', 'QB', 'RB', 'WR', 'TE'] as Position[]).map((position) => (
        <button
          key={position}
          onClick={() => onSelectPosition(position)}
          className={`custom-button ${selectedPosition === position ? 'selected' : ''}`}
        >
          {position}
        </button>
      ))}
    </div>
  );
};

export default RankingsPanel;
