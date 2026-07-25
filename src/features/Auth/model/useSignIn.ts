import { useMutation } from '@tanstack/react-query';
import { signIn } from '../api';

export const useSignIn = function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
};
