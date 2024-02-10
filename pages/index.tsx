import Navbar from '../components/layout/navbar';
import DefaultPage from '../components/layout/default-page';
import { useSession } from "next-auth/react";
import Image from 'next/image';

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="pt-16 min-h-screen bg-background">
      <Navbar session={session} />
      <DefaultPage>
        {/* Center the image */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/fatsos_logo.png"
            alt="Logo"
            width={452} 
            height={235} 
          />
        </div>
      </DefaultPage>
    </div>
  );
};

export default Home;
