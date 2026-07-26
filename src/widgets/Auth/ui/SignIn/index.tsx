import { useFormik } from 'formik';
import {
  signINInitialValues,
  signInValidationSchema,
  useSignIn,
  type SignInValues,
} from '@/features/Auth';
import { useProgressBar, useSnackBar } from '@/shared/hooks';
import { Box, Button, Card, TextField } from '@/shared/ui';
import styles from './styles.module.scss';

export const SignIn = function SignIn() {
  const { showProgressBar, hideProgressBar } = useProgressBar();
  const { showSnackBar } = useSnackBar();

  const {
    mutateAsync: sighIn,
    isPending,
  } = useSignIn();

  const formik = useFormik<SignInValues>({
    initialValues: signINInitialValues,
    validationSchema: signInValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        showProgressBar();
        await sighIn(values);
        resetForm();

        showSnackBar({
          type: 'success',
          text: 'Вход выполнен',
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
        </Box>

        <Button
          className={styles.button}
          disabled={formik.isSubmitting || isPending}
          fullWidth
          type="submit"
          variant="contained"
        >
          Вход
        </Button>
      </Card>
    </Box>
  );
};
