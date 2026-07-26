import { useLocation } from 'react-router';
import type { NavigationItem } from '@/shared/types';
import {
  AppBar as AppBarComponent,
  Box,
  Typography,
} from '@/shared/ui';
import styles from './styles.module.scss';

interface Props {
  navigationItems: NavigationItem[];
}

export const AppBar = function AppBar({ navigationItems }: Props) {
  const location = useLocation();

  const pageData = navigationItems.find(
    ({ path }) => path === location.pathname,
  );
  const RightElement = pageData?.rightElement;

  return (
    <AppBarComponent
      className={styles.appBar}
    >
      <Typography
        className={styles.appBarTitle}
        variant="h6"
      >
        {pageData?.label}
      </Typography>

      {RightElement && (
        <Box className={styles.appBarRightElement}>
          <RightElement />
        </Box>
      )}
    </AppBarComponent>
  );
};
