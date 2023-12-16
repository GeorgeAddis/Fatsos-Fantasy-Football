// pages/index.tsx
import { useSession } from "next-auth/react";
import Navbar from '../components/layout/navbar';

const Home: React.FC = () => {
  const { data: session } = useSession(); // Retrieve the session data using the useSession hook

  return (
    <div className="pt-16 bg-background min-h-screen">
      <Navbar session={session} /> {/* Pass the session data to the Navbar component */}
      <div className="mx-20">
        <h1 className="text-2xl font-bold text-textPrimary">Welcome to my Next.js site!</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Home;