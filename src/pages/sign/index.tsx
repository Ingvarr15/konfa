import {
  type SyntheticEvent,
  useState,
} from 'react';
import {
  signTabsContent,
  signTabsMap,
  type SignTabType,
} from '@/widgets/Auth';
import {
  Box,
  Tab,
  Tabs,
} from '@/shared/ui';
import styles from './styles.module.scss';

export const SignPage = function SignPage() {
  const [tab, setTab] = useState<SignTabType>(signTabsMap.signIn);

  const handleTabChange = (_: SyntheticEvent, newValue: SignTabType) =>
    setTab(newValue);

  return (
    <main>
      <Box className={styles.signContainer}>
        <Box className={styles.tabs}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Вход" value={signTabsMap.signIn} />
            <Tab label="Регистрация" value={signTabsMap.signUp} />
          </Tabs>
        </Box>

        {signTabsContent[tab]}
      </Box>
    </main>
  );
};
