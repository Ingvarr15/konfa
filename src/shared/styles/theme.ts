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
    h1: {
      fontSize: cssVars.fontSizeH1,
    },
  },
  shape: {
    borderRadius: Number.parseInt(cssVars.borderRadiusS, 10),
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          '--Paper-overlay': 'none',
          '--Paper-shadow': 'none',
          'backgroundImage': 'none',
          'boxShadow': 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          'padding': `${cssVars.gapXS} ${cssVars.gapS}`,
          'fontWeight': Number.parseInt(cssVars.fontWeightSemiBold, 10),
          'letterSpacing': '0.3px',
          'textTransform': 'none',
          '&.MuiButton-contained': {
            color: cssVars.colorWhite,
          },
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
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: cssVars.fontFamily,
          letterSpacing: cssVars.letterSpacing,
        },
      },
    },
  },
});
