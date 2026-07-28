import { useProgressBar, useSnackBar } from '@/shared/hooks';
import {
  Box,
  Button,
  Dialog,
  Typography,
} from '@/shared/ui';
import styles from './styles.module.scss';
import { useSignOut } from '../../model';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignOutDialog = function SignOutDialog({
  isOpen,
  onClose,
}: Props) {
  const { showSnackBar } = useSnackBar();
  const { showProgressBar, hideProgressBar } = useProgressBar();
  const {
    mutateAsync: signOut,
    isPending,
  } = useSignOut();

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  const handleSignOut = async () => {
    try {
      showProgressBar();
      await signOut();
      onClose();

      showSnackBar({
        type: 'success',
        text: 'Вы вышли из аккаунта',
      });
    }
    catch {
      showSnackBar({
        type: 'error',
        text: 'Не удалось выйти из аккаунта',
      });
    }
    finally {
      hideProgressBar();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      slotProps={{
        paper: {
          className: styles.paper,
        },
      }}
    >
      <Box className={styles.content}>
        <Typography variant="h6">
          Выйти из аккаунта?
        </Typography>

        <Box className={styles.actions}>
          <Button
            className={styles.actionsButton}
            disabled={isPending}
            onClick={onClose}
            variant="outlined"
          >
            Остаться
          </Button>

          <Button
            className={styles.actionsButton}
            disabled={isPending}
            onClick={handleSignOut}
            variant="contained"
          >
            Выйти
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
