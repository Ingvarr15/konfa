import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api';

export const useSignUp = function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
};
