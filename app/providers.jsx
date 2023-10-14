'use client';

import { useEffect, useState } from 'react';
import {NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) {
    return <>{children}</>
  }

  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class'>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}