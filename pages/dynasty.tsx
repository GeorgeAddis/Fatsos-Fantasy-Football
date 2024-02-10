import { useState } from 'react';
import { useSession } from "next-auth/react";
import Navbar from '../components/layout/navbar';
import DefaultPage from '../components/layout/default-page';
import RankingsPanel from '../components/rankings/RankingsPanel';
import AllPositionsRankings from '../components/rankings/AllPositionsRankings';
import PositionsRankings from '../components/rankings/PositionsRankings';
import { Position } from '../utils/types'; 

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
        <h1 className="text-5xl font-bold mb-4 text-center" style={{ marginTop: "2%", marginBottom: "5%" }}>Dynasty PPR Rankings</h1>
        <div className="rankings-container flex justify-start w-full flex-wrap">
          <div className="rankings-panel" style={{ flex: "1" }}>
            <RankingsPanel
              selectedPosition={selectedPosition}
              onSelectPosition={setSelectedPosition}
            />
          </div>
          <div style={{ flex: "4" }}>
            {renderRankings()}
          </div>
        </div>
      </DefaultPage>
    </>
  );
};

export default Dynasty;
