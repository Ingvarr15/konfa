import { useProgressBar, useSnackBar } from '@/shared/hooks';
import { SignOutIcon } from '@/shared/icons';
import {
  IconButton,
} from '@/shared/ui';
import styles from './styles.module.scss';
import { useSignOut } from '../../model';

export const SignOutButton = function SignOutButton() {
  const { showSnackBar } = useSnackBar();
  const { showProgressBar, hideProgressBar } = useProgressBar();

  const { mutateAsync: signOut } = useSignOut();

  const handleSignOut = async () => {
    try {
      showProgressBar();
      await signOut();

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
    <IconButton
      aria-label="Выйти"
      className={styles.button}
      onClick={handleSignOut}
    >
      <SignOutIcon />
    </IconButton>
  );
};
