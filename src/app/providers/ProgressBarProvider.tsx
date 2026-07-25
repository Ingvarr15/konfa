import { type PropsWithChildren, useState } from 'react';
import { ProgressBarContext } from '@/shared/hooks';
import { cssVars } from '@/shared/styles';
import { LinearProgress } from '@/shared/ui';

export const ProgressBarProvider = function ProgressBarProvider({
  children,
}: PropsWithChildren) {
  const [isShow, setIsShow] = useState(false);

  const handleShowProgressBar = () => setIsShow(true);
  const handleHideProgressBar = () => setIsShow(false);

  return (
    <ProgressBarContext.Provider
      value={{
        isShow,
        handleShowProgressBar,
        handleHideProgressBar,
      }}
    >

      {isShow && (
        <LinearProgress
          sx={{
            height: cssVars.progressBarHeight,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        />
      )}

      {children}
    </ProgressBarContext.Provider>
  );
};
