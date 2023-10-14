

import '@assets/css/global.css'
import {Providers} from "./providers"; //Next-UI provider
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Realtime - Chatapp',
  description: 'realtime - chat app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
