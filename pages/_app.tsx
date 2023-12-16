// pages/_app.tsx
import '../styles/globals.css'; // Make sure this path is correct
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;