import { useState, type SyntheticEvent } from 'react';
import { signTabsContent, signTabsMap, type SignTabType } from '@/widgets/Auth';
import { useAuth } from '@/shared/hooks';
import { Tabs, Tab, Box, CircularProgress } from '@/shared/ui';
import styles from './styles.module.scss';

export const MainPage = function MainPage() {
  const [tab, setTab] = useState<SignTabType>(signTabsMap.signIn);

  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <Box className={styles.loader}>
        <CircularProgress size="min(50vw, 100px)" />
      </Box>
    );
  }

  const handleTabChange = (_: SyntheticEvent, newValue: SignTabType) =>
    setTab(newValue);

  return (
    <main>
      {isAuthenticated
        ? (
            <>
              Привет,
              {user?.user_metadata.username}
            </>
          )
        : (
            <Box className={styles.signContainer}>
              <Box className={styles.tabs}>
                <Tabs value={tab} onChange={handleTabChange}>
                  <Tab label="Вход" value={signTabsMap.signIn} />
                  <Tab label="Регистрация" value={signTabsMap.signUp} />
                </Tabs>
              </Box>

              {signTabsContent[tab]}
            </Box>
          )}

    </main>
  );
};
