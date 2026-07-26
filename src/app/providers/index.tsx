import { CssBaseline } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, StrictMode, useState } from 'react';
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
            <SnackBarProvider>
              <AuthProvider>
                <ProgressBarProvider>
                  {children}
                </ProgressBarProvider>
              </AuthProvider>
            </SnackBarProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StrictMode>
  );
};
