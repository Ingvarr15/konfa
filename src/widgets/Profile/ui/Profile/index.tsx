import { useState, type KeyboardEvent } from 'react';
import { ChangePasswordDialog } from '@/features/Profile';
import { useAuth, useSnackBar } from '@/shared/hooks';
import { KeyIcon } from '@/shared/icons';
import { copyToBuffer } from '@/shared/libs';
import {
  Box,
  Button,
  Card,
  Typography,
} from '@/shared/ui';
import styles from './styles.module.scss';

export const Profile = function Profile() {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen]
    = useState(false);

  const {
    user,
  } = useAuth();
  const { showSnackBar } = useSnackBar();

  const inviteCode = user?.user_metadata.invite_code;

  const handleOpenChangePasswordModal = () =>
    setIsChangePasswordModalOpen(true);
  const handleCloseChangePasswordModal = () =>
    setIsChangePasswordModalOpen(false);

  const handleCopyCode = async () => {
    if (!inviteCode) {
      showSnackBar({
        type: 'error',
        text: 'Код приглашения отсутствует',
      });
      return;
    }

    try {
      await copyToBuffer(inviteCode);

      showSnackBar({
        type: 'success',
        text: 'Код скопирован',
      });
    }
    catch {
      showSnackBar({
        type: 'error',
        text: 'Не удалось скопировать код',
      });
    }
  };

  const handleCodeKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCopyCode();
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.profileItem}>
        <Typography
          className={styles.title}
          variant="body1"
        >
          Имя пользователя
        </Typography>

        <Card className={styles.card}>
          <Typography
            className={styles.value}
            variant="body1"
          >
            {user?.user_metadata.username}
          </Typography>
        </Card>
      </Box>

      <Box className={styles.profileItem}>
        <Typography
          className={styles.title}
          variant="body1"
        >
          Email
        </Typography>

        <Card className={styles.card}>
          <Typography
            className={styles.value}
            variant="body1"
          >
            {user?.email}
          </Typography>
        </Card>
      </Box>

      <Box className={styles.profileItem}>
        <Typography
          className={styles.title}
          variant="body1"
        >
          Код приглашения
        </Typography>

        <Card
          className={styles.codeCard}
          onClick={handleCopyCode}
          onKeyDown={handleCodeKeyDown}
          role="button"
          tabIndex={0}
        >
          <Typography
            className={styles.valueCode}
            variant="body1"
          >
            {inviteCode}
          </Typography>
        </Card>
      </Box>

      <Box className={styles.profileItem}>
        <Button
          className={styles.profileItemPassword}
          variant="text"
          onClick={handleOpenChangePasswordModal}
        >
          <KeyIcon />

          <Typography variant="body1">Сменить пароль</Typography>
        </Button>
      </Box>

      <ChangePasswordDialog
        isOpen={isChangePasswordModalOpen}
        onClose={handleCloseChangePasswordModal}
      />
    </Box>
  );
};
