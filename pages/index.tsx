import Navbar from '../components/layout/navbar';
import DefaultPage from '../components/layout/default-page';
import { useSession } from "next-auth/react";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="pt-16 min-h-screen bg-background">
      <Navbar session={session} />
      <DefaultPage>
        <h1 className="text-3xl font-bold text-textPrimary mb-4">Welcome to my Next.js site!</h1>
        {/* Add more content here */}
      </DefaultPage>
    </div>
  );
};

export default Home;
