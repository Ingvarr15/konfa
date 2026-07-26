import { useLocation, useNavigate } from 'react-router';
import type { NavigationItem } from '@/shared/types';
import {
  BottomNavigationAction,
  BottomNavigation as BottomNavigationComponent,
} from '@/shared/ui';
import styles from './styles.module.scss';

interface Props {
  navigationItems: NavigationItem[];
}

export const BottomNavigation = function BottomNavigation({
  navigationItems,
}: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <BottomNavigationComponent
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
    </BottomNavigationComponent>
  );
};
