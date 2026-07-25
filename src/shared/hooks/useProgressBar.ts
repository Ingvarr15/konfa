import { createContext, useCallback, useContext } from 'react';

interface ProgressBarContextValue {
  isShow: boolean;
  handleShowProgressBar: () => void;
  handleHideProgressBar: () => void;
}

export const ProgressBarContext = createContext<ProgressBarContextValue | null>(
  null,
);

export const useProgressBar = () => {
  const context = useContext(ProgressBarContext);

  if (!context) {
    throw new Error('useProgressBar must be used within ProgressBarProvider');
  }

  const {
    isShow,
    handleShowProgressBar,
    handleHideProgressBar,
  } = context;

  const showProgressBar = useCallback(
    () => {
      handleShowProgressBar();
    },
    [handleShowProgressBar],
  );

  const hideProgressBar = useCallback(
    () => {
      handleHideProgressBar();
    },
    [handleHideProgressBar],
  );

  return {
    isShow,
    showProgressBar,
    hideProgressBar,
  };
};
