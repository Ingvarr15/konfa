import { useFormik } from 'formik';
import {
  signUpInitialValues,
  useSignUp,
  signUpValidationSchema,
  type SignUpValues,
} from '@/features/Auth';
import { useProgressBar, useSnackBar } from '@/shared/hooks';
import { Box, Button, Card, TextField } from '@/shared/ui';
import styles from './styles.module.scss';

export const SignUp = function SignUp() {
  const { showProgressBar, hideProgressBar } = useProgressBar();
  const { showSnackBar } = useSnackBar();

  const {
    mutateAsync: sighUp,
    isPending,
  } = useSignUp();

  const formik = useFormik<SignUpValues>({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        showProgressBar();
        await sighUp(values);
        resetForm();

        showSnackBar({
          type: 'success',
          text: 'Письмо с кодом подтверждения было отправлено вам '
            + 'на email',
        });
      }
      catch (error) {
        showSnackBar({
          type: 'error',
          text: error instanceof Error
            ? error.message
            : 'Не удалось зарегистрироваться',
        });

        return;
      }
      finally {
        hideProgressBar();
        setSubmitting(false);
      }
    },
  });

  return (
    <Box className={styles.container}>
      <Card
        className={styles.form}
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Box className={styles.formInner}>
          <TextField
            autoComplete="username"
            error={formik.touched.username && Boolean(formik.errors.username)}
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            label="Имя пользователя"
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
          />

          <TextField
            autoComplete="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />

          <TextField
            autoComplete="off"
            error={formik.touched.inviteCode
              && Boolean(formik.errors.inviteCode)}
            fullWidth
            helperText={formik.touched.inviteCode
              && formik.errors.inviteCode}
            label="Код приглашения"
            name="inviteCode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.inviteCode}
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
        </Box>

        <Button
          className={styles.button}
          disabled={formik.isSubmitting || isPending}
          fullWidth
          type="submit"
          variant="contained"
        >
          Зарегистрироваться
        </Button>
      </Card>
    </Box>
  );
};
