import { supabase } from '@/shared/api';
import type { SignUpValues } from '../types';

export const signUp = async ({
  email,
  password,
  username,
}: SignUpValues) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    if (error.code === 'user_already_exists') {
      throw new Error('Адрес электронной почты уже занят');
    }

    if (error.status === 500) {
      throw new Error('Имя пользователя уже занято');
    }

    throw error;
  }

  return data;
};
