import { useMutation } from '@tanstack/react-query';
import { signOut } from '../api';

export const useSignOut = function useSignOut() {
  return useMutation({
    mutationFn: signOut,
  });
};
