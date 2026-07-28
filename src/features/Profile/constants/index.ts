import { Yup } from '@/shared/libs';
import type { ChangePasswordValues } from '../types';

export const changePasswordInitialValues: ChangePasswordValues = {
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
};

export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Введите текущий пароль'),
  password: Yup.string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .required('Введите пароль'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
});
