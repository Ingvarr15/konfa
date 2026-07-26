import {
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { supabase } from '@/shared/api';
import {
  AuthContext,
  type AuthContextValue,
  useSnackBar,
} from '@/shared/hooks';
import type { Session } from '@supabase/supabase-js';

export const AuthProvider = function AuthProvider({
  children,
}: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showSnackBar } = useSnackBar();
  const isSignUpConfirmation = useRef(
    new URLSearchParams(window.location.hash.slice(1))
      .get('type') === 'signup',
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);

      if (nextSession && isSignUpConfirmation.current) {
        isSignUpConfirmation.current = false;

        showSnackBar({
          type: 'success',
          text: 'Адрес электронной почты успешно подтверждён',
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [showSnackBar]);

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
