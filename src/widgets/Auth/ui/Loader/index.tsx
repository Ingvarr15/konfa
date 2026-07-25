import {
  Box,
  CircularProgress,
} from '@/shared/ui';
import styles from './styles.module.scss';

export const Loader = function Loader() {
  return (
    <Box className={styles.loader}>
      <CircularProgress size="min(50vw, 100px)" />
    </Box>
  );
};
