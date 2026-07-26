import { Yup } from '@/shared/libs';
import type { SignInValues, SignUpValues } from '../types';

export const signINInitialValues: SignInValues = {
  email: '',
  password: '',
};

export const signUpInitialValues: SignUpValues = {
  username: '',
  email: '',
  inviteCode: '',
  password: '',
  passwordConfirmation: '',
};

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Введите корректный email')
    .required('Введите email'),
  password: Yup.string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .required('Введите пароль'),
});

export const signUpValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(30, 'Имя должно содержать не более 30 символов')
    .required('Введите имя пользователя'),
  email: Yup.string()
    .trim()
    .email('Введите корректный email')
    .required('Введите email'),
  inviteCode: Yup.string()
    .trim()
    .length(16, 'Код приглашения должен содержать 16 символов')
    .required('Введите код приглашения'),
  password: Yup.string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .required('Введите пароль'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
});
