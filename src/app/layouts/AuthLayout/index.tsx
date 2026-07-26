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
import { signNavigationItems } from '../../config';

export const AuthLayout = function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = signNavigationItems.find(
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

      <Box
        className={styles.content}
        component="main"
      >
        <Outlet />
      </Box>

      <BottomNavigation
        value={location.pathname}
        onChange={(_, path: string) => navigate(path)}
      >
        {signNavigationItems.map(({
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
