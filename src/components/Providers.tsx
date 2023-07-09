'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SearchContextProvider } from '@/context/search.context';

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <SearchContextProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SearchContextProvider>
    </SessionProvider>
  );
}
