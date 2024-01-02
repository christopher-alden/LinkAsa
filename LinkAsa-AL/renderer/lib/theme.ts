import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'suisse, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0C5494',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5', 
      paper: '#ffffff', 
    },
  },
  components: {
    
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiAppBar:{
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiContainer: {

      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export default theme;
