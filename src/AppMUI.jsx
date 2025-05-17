import { useMemo, createContext, useState, useContext, useEffect } from 'react'
import { createTheme, ThemeProvider, Box, CssBaseline, useMediaQuery } from '@mui/material'
import { ThemeContextProvider, useThemeContext } from './context/ThemeContext'
import App from './App'

// Context for MUI theme
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark',
})

export function useColorMode() {
  return useContext(ColorModeContext)
}

function AppMUI() {
  // Use system preference as default
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light')
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
      mode,
    }),
    [mode],
  )

  // Update theme when system preference changes
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode
                primary: {
                  main: '#0070f3',
                  light: '#42a5f5',
                  dark: '#0059b2',
                },
                secondary: {
                  main: '#6c63ff',
                },
                background: {
                  default: '#ffffff',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#24292e',
                  secondary: '#586069',
                },
              }
            : {
                // Dark mode
                primary: {
                  main: '#149eca',
                  light: '#42a5f5',
                  dark: '#0088cc',
                },
                secondary: {
                  main: '#6c63ff',
                },
                background: {
                  default: '#0a0a0a',
                  paper: '#121212',
                },
                text: {
                  primary: '#e6e6e6',
                  secondary: '#a0a0a0',
                },
              }),
        },
        typography: {
          fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontWeight: 800,
          },
          h2: {
                        fontWeight: 700,
          },
          h3: {
                          fontWeight: 600,
          },
          button: {
            textTransform: 'none',
                            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? '#121212' : '#ffffff',
                boxShadow: mode === 'dark' 
                  ? '0 2px 8px rgba(0,0,0,0.3)' 
                  : '0 2px 8px rgba(0,0,0,0.05)',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: '8px 16px',
              },
              contained: {
                boxShadow: 'none',
                            '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                overflow: 'hidden',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
                          bgcolor: 'background.default',
          color: 'text.primary',
          transition: 'all 0.3s ease',
        }}>
          <App />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default AppMUI 