import { supabase } from '@/shared/api';
import type { SignInValues, SignUpValues } from '../types';

export const signIn = async ({
  email,
  password,
}: SignInValues) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.code === 'invalid_credentials') {
      throw new Error('Неверные данные');
    }

    throw error;
  }

  return data;
};

export const signUp = async ({
  email,
  inviteCode,
  password,
  username,
}: SignUpValues) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        invite_code: inviteCode.trim().toUpperCase(),
        username,
      },
    },
  });

  if (error) {
    if (error.code === 'user_already_exists') {
      throw new Error('Адрес электронной почты уже занят');
    }

    if (error.status === 500) {
      throw new Error('Ошибка регистрации');
    }

    throw error;
  }

  return data;
};

export const signOut = async () => {
  const data = await supabase.auth.signOut();

  return data;
};
