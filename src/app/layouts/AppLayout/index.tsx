import { BottomNavigationAction } from '@mui/material';
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router';
import {
  AppBar,
  BottomNavigation,
  Box,
  Typography,
} from '@/shared/ui';
import styles from './styles.module.scss';
import { navigationItems } from '../../config';

export const AppLayout = function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = navigationItems.find(
    ({ path }) => path === location.pathname,
  )?.label;

  return (
    <Box className={styles.layout}>
      <AppBar
        className={styles.appBar}
        position="static"
      >
        <Typography
          className={styles.title}
          variant="h6"
        >
          {pageTitle}
        </Typography>
      </AppBar>

      <Box className={styles.content}>
        <Outlet />
      </Box>

      <BottomNavigation
        value={location.pathname}
        onChange={(_, path: string) => navigate(path)}
      >
        {navigationItems.map(({
          icon: Icon,
          label,
          path,
        }) => (
          <BottomNavigationAction
            aria-label={label}
            className={styles.navigationAction}
            classes={{
              selected: styles.navigationActionSelected,
            }}
            icon={<Icon />}
            key={path}
            value={path}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};
