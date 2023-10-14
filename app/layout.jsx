

import '@assets/css/globals.css'
import { Nav } from '@components/index';
import { Providers } from "./providers"; //Next-UI provider
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Realtime - Chatapp',
  description: 'realtime - chat app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Nav />
          
          {children}
        </Providers>
      </body>
    </html>
  )
}
