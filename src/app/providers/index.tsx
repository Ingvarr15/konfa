import { CssBaseline } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, StrictMode, useState } from 'react';
import { BrowserRouter } from 'react-router';
import { theme } from '@/shared/styles/theme';
import { AuthProvider } from './AuthProvider';
import { ProgressBarProvider } from './ProgressBarProvider';
import { SnackBarProvider } from './SnackBarProvider';

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
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <AuthProvider>
                <SnackBarProvider>
                  <ProgressBarProvider>
                    {children}
                  </ProgressBarProvider>
                </SnackBarProvider>
              </AuthProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StrictMode>
  );
};
