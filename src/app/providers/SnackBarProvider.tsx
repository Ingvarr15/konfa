import {
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import { SnackBarContext } from '@/shared/hooks';
import { cssVars } from '@/shared/styles';
import {
  type SnackBarOptions,
} from '@/shared/types';
import { Alert, Snackbar } from '@/shared/ui';

export const SnackBarProvider = function SnackBarProvider({
  children,
}: PropsWithChildren) {
  const [isShow, setShow] = useState(false);
  const [snackBarOptions, setSnackBarOptions] = useState<SnackBarOptions>({
    type: 'success',
    text: '',
    duration: 5000,
  });

  const handleShowSnackBar = useCallback(() => setShow(true), []);
  const handleHideSnackBar = useCallback(() => setShow(false), []);

  const handleSetSnackBarOptions = useCallback(
    (newOptions: SnackBarOptions) => setSnackBarOptions(newOptions),
    [],
  );

  return (
    <SnackBarContext.Provider
      value={{
        isShow,
        handleShowSnackBar,
        handleHideSnackBar,
        handleSetSnackBarOptions,
      }}
    >
      {children}

      <Snackbar
        // className={styles.snackBar}
        open={isShow}
        autoHideDuration={snackBarOptions.duration}
        onClose={handleHideSnackBar}
        sx={{
          bottom: `calc(${cssVars.bottomNavigationHeight} + ${cssVars.gapXS})`,
        }}
      >
        <Alert
          onClose={handleHideSnackBar}
          severity={snackBarOptions.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackBarOptions.text}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
