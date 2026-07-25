import {
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabase } from '@/shared/api';
import {
  AuthContext,
  type AuthContextValue,
} from '@/shared/hooks';
import type { Session } from '@supabase/supabase-js';

export const AuthProvider = function AuthProvider({
  children,
}: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session),
    isLoading,
  }), [isLoading, session]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
