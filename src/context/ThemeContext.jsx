import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Define theme color palettes
const darkPalette = {
  primary: {
    main: '#3990FF',
    light: '#6FB6FF',
    dark: '#054DA7',
  },
  secondary: {
    main: '#D3232F',
    light: '#FF9192',
    dark: '#A10E25',
  },
  background: {
    default: '#131318',
    paper: '#25252D',
    surface: '#1E1E24',
  },
  text: {
    primary: '#F7F7F8',
    secondary: '#B9B9C6',
  },
};

const lightPalette = {
  primary: {
    main: '#096BDE',
    light: '#ADDBFF',
    dark: '#054DA7',
  },
  secondary: {
    main: '#D3232F',
    light: '#FFC7C5',
    dark: '#A10E25',
  },
  background: {
    default: '#F7F7F8',
    paper: '#FFFFFF',
    surface: '#EBEBEF',
  },
  text: {
    primary: '#131318',
    secondary: '#5A5A72',
  },
};

// Create theme context
export const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark',
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  // Check if user previously selected a theme
  const storedTheme = localStorage.getItem('theme-mode');
  const [mode, setMode] = useState(storedTheme || 'dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Create MUI theme based on current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' ? darkPalette : lightPalette),
        },
        typography: {
          fontFamily: '"Gilroy", "Arial", sans-serif',
          h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          },
          h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
          h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
          },
          h4: {
            fontSize: '1.25rem',
            fontWeight: 500,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 500,
                padding: '8px 22px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.5)' 
                  : '0 4px 20px rgba(0,0,0,0.1)',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider; 