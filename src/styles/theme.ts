import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

export const themeByMode = (mode: PaletteMode) =>
  createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Onest',
        fontWeight: 400,
        color: '#F1F5FD',
      },
    },
    palette: {
      mode,
      primary: {
        main: '#09090A',
        light: '#fff',
        dark: '#F8F8F8',
      },
      secondary: {
        main: mode === 'light' ? '#F0F0F0' : '#141414',
        dark: '#D2D2D2',
        light: '#E5E6E9',
        contrastText: '#B5B5B5',
      },
      success: {
        main: 'rgba(120, 169, 115, 1)',
        light: 'rgba(17, 246, 40, 0.1)',
      },
      warning: {
        main: '#b2aa24',
        light: 'rgba(178,170,36,0.2)',
      },
      error: {
        main: '#DC2626',
        light: 'rgba(234,94,51,0.2)',
      },
      common: {
        white: '#fff',
        black: '#000',
      },
      grey: {
        50: '#F1F1F2',
        100: '#ececec',
        200: '#d7d7d7',
        300: '#D2D2D2',
        400: '#B5B5B5',
        500: '#7a7a7a',
      },
      text: {
        primary: mode === 'light' ? '#000' : '#fff',
        secondary: mode === 'light' ? '#ffffffB2' : '#141414',
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableFocusRipple: true,
        },
        styleOverrides: {
          root: {
            minWidth: 0,
            '&:disabled': {
              backgroundColor: '#E0E5F2',
              color: '#98A5BD',
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltipPlacementLeft: {
            minWidth: 0,
            maxWidth: '1000px',
            background: '#E5E6E9',
            border: '1px solid black',
            padding: '16px',
            zIndex: -100,
          },
          tooltipPlacementBottom: {
            minWidth: 0,
            maxWidth: '270px',
            background: 'rgba(243, 246, 252, 1)',
            borderRadius: '16px',
            padding: '16px 20px',
            zIndex: -100,
            color: 'rgba(71, 85, 105, 1)',
            fontSize: '16px',
          },
          tooltipPlacementRight: {
            minWidth: 0,
            maxWidth: '270px',
            background: 'rgba(243, 246, 252, 1)',
            borderRadius: '16px',
            padding: '16px 20px',
            boxSizing: 'border-box',
            zIndex: -100,
            color: 'rgba(71, 85, 105, 1)',
            fontSize: '16px',
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          select: {
            padding: '16px 10px !important',
            boxSizing: 'border-box',
            border: 'none',
            width: '100%',
            height: '100%',
            maxWidth: '172px',
            maxHeight: '68px',
            borderRadius: '8px',
            '&:hover': {
              border: 'none',
              zIndex: 10,
            },
          },
          icon: {
            display: 'none',
            color: 'black!important',
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            margin: 'auto',
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1536,
      },
    },
    shape: {
      borderRadius: 2,
    },
    spacing: 4,
  });
