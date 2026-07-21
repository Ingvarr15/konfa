import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, StrictMode, useState } from 'react';
import { HashRouter } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const Providers = function Providers({ children }: Props) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 10000,
          retry: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <HashRouter>
        <StrictMode>{children}</StrictMode>
      </HashRouter>
    </QueryClientProvider>
  );
};
