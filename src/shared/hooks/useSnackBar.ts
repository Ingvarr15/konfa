import { createContext, useCallback, useContext } from 'react';
import { type SnackBarOptions } from '@/shared/types';

interface SnackBarContextValue {
  isShow: boolean;
  handleShowSnackBar: () => void;
  handleHideSnackBar: () => void;
  handleSetSnackBarOptions: (value: SnackBarOptions) => void;
}

export const SnackBarContext = createContext<SnackBarContextValue | null>(
  null,
);

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within SnackBarProvider');
  }

  const {
    isShow,
    handleShowSnackBar,
    handleHideSnackBar,
    handleSetSnackBarOptions,
  } = context;

  const showSnackBar = useCallback(
    ({ type, text, duration = 5000 }: SnackBarOptions) => {
      handleSetSnackBarOptions({ type, text, duration });
      handleShowSnackBar();
    },
    [handleShowSnackBar, handleSetSnackBarOptions],
  );

  const hideSnackBar = useCallback(() => {
    handleHideSnackBar();
  }, [handleHideSnackBar]);

  return {
    isShow,
    showSnackBar,
    hideSnackBar,
  };
};
