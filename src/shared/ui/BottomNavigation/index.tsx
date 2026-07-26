import {
  BottomNavigation as MuiBottomNavigation,
  type BottomNavigationProps,
  Paper,
} from '@mui/material';
import { cx } from '@/shared/libs';
import styles from './styles.module.scss';

type Component = typeof MuiBottomNavigation;

const BottomNavigationBase = function BottomNavigation({
  className,
  ...props
}: BottomNavigationProps) {
  return (
    <MuiBottomNavigation
      className={cx(styles.bottomNavigation, className)}
      component={Paper}
      elevation={0}
      {...props}
    />
  );
};

export const BottomNavigation = BottomNavigationBase as Component;
