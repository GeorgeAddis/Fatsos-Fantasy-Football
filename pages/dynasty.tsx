import { useState } from 'react';
import { useSession } from "next-auth/react";
import Navbar from '../components/layout/navbar';
import DefaultPage from '../components/layout/default-page';
import RankingsPanel from '../components/rankings/RankingsPanel';
import AllPositionsRankings from '../components/rankings/AllPositionsRankings';
import PositionsRankings from '../components/rankings/PositionsRankings';
import { Position } from './types'; 

const Dynasty: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position>('Overall');
  const { data: session } = useSession();

  const renderRankings = () => {
    if (selectedPosition === 'Overall') {
      return <AllPositionsRankings rankingType="dynasty" />;
    } else {
      return <PositionsRankings rankingType="dynasty" position={selectedPosition} />;
    }
  };

  return (
    <>
      <Navbar session={session} />
      <DefaultPage>
      <h1 className="text-5xl font-bold mb-4 text-center" style={{ marginBottom: "5%" }}>Dynasty PPR Rankings</h1>
        <div className="flex w-full">
          <div className="w-1/4" style={{ flex: "0 0 25%" }}>
            <RankingsPanel
              selectedPosition={selectedPosition}
              onSelectPosition={setSelectedPosition}
            />
          </div>
          <div className="w-3/4" style={{ flex: "0 0 75%" }}>
            {renderRankings()}
          </div>
        </div>
      </DefaultPage>
    </>
  );
};

export default Dynasty;
