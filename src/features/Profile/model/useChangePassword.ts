import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../api';

export const useChangePassword = function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
};
