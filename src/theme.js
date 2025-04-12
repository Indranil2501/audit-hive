import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Set the overall mode to light for a professional look
    primary: {
      main: '#1e1e1e', // Dark color for the header
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#f5f5f5', // Cream/white color for the content area
      paper: '#ffffff', // Slightly lighter for cards or paper elements
    },
    text: {
      primary: '#333333', // Dark text for readability
      secondary: '#666666', // Subtle secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5', // Cream/white background for the content
          color: '#333333', // Dark text for the body
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Dark header
          color: '#ffffff', // White text for the header
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // White for paper elements
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for a professional finish
        },
      },
    },
  },
});

export default theme;