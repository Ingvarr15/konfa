import { useState } from 'react';
import { SignOutIcon } from '@/shared/icons';
import {
  IconButton,
} from '@/shared/ui';
import styles from './styles.module.scss';
import { SignOutDialog } from '../SignOutDialog';

export const SignOutButton = function SignOutButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <IconButton
        aria-label="Выйти"
        className={styles.button}
        onClick={handleOpenDialog}
      >
        <SignOutIcon />
      </IconButton>

      <SignOutDialog
        onClose={handleCloseDialog}
        isOpen={isDialogOpen}
      />
    </>
  );
};
