// components/layout/navbar.tsx

import Link from "next/link";
// import UserDropdown from "./user-dropdown"; // Commented out if not used
import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <div className="navbar">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center w-full h-full">
        <div className="flex items-center space-x-4">
          <Link href="/"><a className="nav-link">Home</a></Link>
          <Link href="/dynasty"><a className="nav-link">Dynasty</a></Link>
          <Link href="/dynasty"><a className="nav-link">Redraft</a></Link>
        </div>
        {/* Commented out the sign-in section as requested
        {session ? (
          <UserDropdown session={session} />
        ) : (
          <Link href="/sign-in"><a className="nav-link">Sign In</a></Link>
        )}
        */}
      </nav>
    </div>
  );
}
