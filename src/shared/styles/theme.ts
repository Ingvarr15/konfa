import { createTheme, darken } from '@mui/material/styles';
import cssVars from './variables.module.scss';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: cssVars.colorMain,
    },
    error: {
      main: cssVars.colorError,
    },
    success: {
      main: cssVars.colorSuccess,
    },
    text: {
      primary: cssVars.colorWhite,
    },
    background: {
      default: cssVars.colorBackgroundDark,
      paper: cssVars.colorBackgroundLight,
    },
  },
  typography: {
    fontFamily: cssVars.fontFamily,
  },
  shape: {
    borderRadius: Number.parseInt(cssVars.borderRadiusS, 10),
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          'fontWeight': Number.parseInt(cssVars.fontWeightSemiBold, 10),
          'textTransform': 'none',
          '&.MuiButton-contained.MuiButton-colorPrimary:hover': {
            backgroundColor: darken(cssVars.colorMain, 0.1),
          },
          '&.MuiButton-outlined': {
            borderWidth: '2px',
          },
          '&.MuiButton-outlined.MuiButton-colorPrimary:hover': {
            borderColor: cssVars.colorMain,
          },
        },
      },
    },
  },
});
