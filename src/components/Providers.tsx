"use client";

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { SearchContextProvider } from '@/context/search.context';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <SearchContextProvider>{children}</SearchContextProvider>
    </SessionProvider>
  );
}
