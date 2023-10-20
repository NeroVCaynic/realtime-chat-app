

import '@assets/css/globals.css';
import { createServerSupabaseClient } from "@utils/supabaseServerClient";
import { Nav } from '@components/index';
import { Providers } from "./providers"; //Next-UI provider
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Realtime - Chatapp',
  description: 'realtime - chat app',
}

export default async function RootLayout({ children }) {
  const supabase = createServerSupabaseClient();
  const {data: {session}} = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Nav isSession={session}/>
          
          {children}
        </Providers>
      </body>
    </html>
  );
}
