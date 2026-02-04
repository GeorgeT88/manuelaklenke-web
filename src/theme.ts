import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5B4A3F',
      light: '#7D6B5D',
      dark: '#3E322A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C4956A',
      light: '#D4B08E',
      dark: '#A07548',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAF7F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2420',
      secondary: '#5B4A3F',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
      },
    },
  },
});

export default theme;
