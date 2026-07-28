import { supabase } from '@/shared/api';
import type { ChangePasswordValues } from '../types';

export const changePassword = async ({
  currentPassword,
  password,
}: ChangePasswordValues) => {
  const { data, error } = await supabase.auth.updateUser({
    current_password: currentPassword,
    password,
  });

  if (error) {
    if (
      error.code === 'current_password_invalid'
      || error.code === 'reauthentication_not_valid'
    ) {
      throw new Error('Текущий пароль указан неверно');
    }

    if (error.code === 'same_password') {
      throw new Error('Новый пароль должен отличаться от текущего');
    }

    if (error.code === 'weak_password') {
      throw new Error(
        'Новый пароль недостаточно надёжный (требуются буквы и цифры)',
      );
    }

    throw error;
  }

  return data;
};
