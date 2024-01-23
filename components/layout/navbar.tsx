// components/layout/navbar.tsx

import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }) {

  // Apply padding as a percentage
  const navStyle: React.CSSProperties = {
    paddingLeft: '7%',  // Set the left padding to be 7%
    paddingRight: '7%', // Set the right padding to be 7%
  };

  /* Align the right section to the far right */
  const rightSectionStyle = session ? {} : { marginLeft: 'auto' };

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-30 transition-all">
      <nav style={navStyle} className="max-w-screen-xl mx-auto flex justify-between items-center w-full h-full">
        {/* Left-aligned links */}
        <div className="flex items-center space-x-4">
          {/* Home Link */}
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
          {/* Dynasty Link */}
          <Link href="/dynasty">
            <a className="nav-link">Dynasty</a>
          </Link>
          {/* Dynasty Link TODO change to link to redraft page*/}
          <Link href="/dynasty">
            <a className="nav-link">Redraft</a>
          </Link>
        </div>
        {/* Right-aligned sign in link 
        <div style={rightSectionStyle}>
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <Link href="/sign-in">
              <a className="nav-link">Sign In</a>
            </Link>
          )}
        </div>*/}
      </nav>
    </div>
  );
}