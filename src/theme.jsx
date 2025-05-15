import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A2C6B', 
    },
    secondary: {
      main: '#D4A017', 
    },
    background: {
      default: '#F8F1E9', 
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      color: '#4A2C6B',
    },
    h6: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
    },
    button: {
      fontFamily: "'Roboto', sans-serif",
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s ease-in-out',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #4A2C6B 30%, #6B3D9A 90%)',
          color: '#FFFFFF',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #D4A017 30%, #E8B923 90%)',
          color: '#333333',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #4A2C6B 30%, #6B3D9A 90%)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});

export default theme;