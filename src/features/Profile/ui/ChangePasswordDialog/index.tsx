import { useFormik } from 'formik';
import { useProgressBar, useSnackBar } from '@/shared/hooks';
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
} from '@/shared/ui';
import styles from './styles.module.scss';
import {
  changePasswordInitialValues,
  changePasswordValidationSchema,
} from '../../constants';
import { useChangePassword } from '../../model';
import type { ChangePasswordValues } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordDialog = function ChangePasswordDialog({
  isOpen,
  onClose,
}: Props) {
  const { showSnackBar } = useSnackBar();
  const { showProgressBar, hideProgressBar } = useProgressBar();
  const {
    mutateAsync: changePassword,
    isPending,
  } = useChangePassword();

  const formik = useFormik<ChangePasswordValues>({
    initialValues: changePasswordInitialValues,
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        showProgressBar();
        await changePassword(values);
        resetForm();
        onClose();

        showSnackBar({
          type: 'success',
          text: 'Пароль успешно изменён',
        });
      }
      catch (error) {
        showSnackBar({
          type: 'error',
          text: error instanceof Error
            ? error.message
            : 'Не удалось изменить пароль',
        });

        return;
      }
      finally {
        hideProgressBar();
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    if (!isPending && !formik.isSubmitting) {
      onClose();
      formik.resetForm();
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
      <Box
        className={styles.content}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography className={styles.title} variant="h6">
          Смена пароля
        </Typography>

        <TextField
          autoComplete="current-password"
          error={
            formik.touched.currentPassword
            && Boolean(formik.errors.currentPassword)
          }
          fullWidth
          helperText={
            formik.touched.currentPassword
            && formik.errors.currentPassword
          }
          label="Текущий пароль"
          name="currentPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.currentPassword}
        />

        <TextField
          autoComplete="new-password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Пароль"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />

        <TextField
          autoComplete="new-password"
          error={
            formik.touched.passwordConfirmation
            && Boolean(formik.errors.passwordConfirmation)
          }
          fullWidth
          helperText={
            formik.touched.passwordConfirmation
            && formik.errors.passwordConfirmation
          }
          label="Подтверждение пароля"
          name="passwordConfirmation"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.passwordConfirmation}
        />

        <Box className={styles.actions}>
          <Button
            className={styles.actionsButton}
            variant="outlined"
            disabled={isPending}
            onClick={handleClose}
          >
            Отменить
          </Button>

          <Button
            className={styles.actionsButton}
            variant="contained"
            disabled={formik.isSubmitting || isPending}
            type="submit"
          >
            Изменить
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
