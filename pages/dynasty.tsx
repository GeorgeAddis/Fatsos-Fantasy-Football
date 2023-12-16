// pages/dynasty.tsx
import { useSession } from "next-auth/react";
import Navbar from '../components/layout/navbar';

const Dynasty: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="pt-16 bg-background min-h-screen">
      <Navbar session={session} />
      <div className="mx-20">
        <h1 className="text-2xl font-bold text-textPrimary">Dynasty page!</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Dynasty;
