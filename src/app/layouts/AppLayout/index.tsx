import {
  Outlet,
} from 'react-router';
import { AppBar, BottomNavigation } from '@/widgets/Navigation';
import { cx } from '@/shared/libs';
import type { NavigationItem } from '@/shared/types';
import {
  Box,
} from '@/shared/ui';
import styles from './styles.module.scss';

interface Props {
  centerContent?: boolean;
  navigationItems: NavigationItem[];
}

export const AppLayout = function AppLayout({
  centerContent = false,
  navigationItems,
}: Props) {
  return (
    <Box className={styles.layout}>
      <AppBar navigationItems={navigationItems} />

      <Box className={styles.content}>
        <Box
          className={cx(
            styles.contentInner,
            centerContent && styles.contentInnerCentered,
          )}
        >
          <Outlet />
        </Box>
      </Box>

      <BottomNavigation navigationItems={navigationItems} />
    </Box>
  );
};
