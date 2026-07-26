import { type PropsWithChildren, useState } from 'react';
import { SnackBarContext } from '@/shared/hooks';
import {
  type SnackBarOptions,
} from '@/shared/types';
import { Alert, Snackbar } from '@/shared/ui';
import styles from './styles.module.scss';

export const SnackBarProvider = function SnackBarProvider({
  children,
}: PropsWithChildren) {
  const [isShow, setShow] = useState(false);
  const [snackBarOptions, setSnackBarOptions] = useState<SnackBarOptions>({
    type: 'success',
    text: '',
    duration: 5000,
  });

  const handleShowSnackBar = () => setShow(true);
  const handleHideSnackBar = () => setShow(false);

  const handleSetSnackBarOptions = (newOptions: SnackBarOptions) =>
    setSnackBarOptions(newOptions);

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
        className={styles.snackBar}
        open={isShow}
        autoHideDuration={snackBarOptions.duration}
        onClose={handleHideSnackBar}
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
