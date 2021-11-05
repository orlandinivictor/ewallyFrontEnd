import { createTheme, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

import Routes from './routes';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#34bfc7',
        contrastText: '#fff',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1600,
      },
    },
    typography: {
      fontFamily: "'Inter','Roboto','Helvetica','Arial',sans-serif",
    },
    overrides: {
      MuiFormLabel: {
        root: {
          color: 'rgba(255, 255, 255, 0.54)',
        },
      },
      MuiInputBase: {
        input: {
          color: '#eee',
        },
      },
      MuiInput: {
        underline: {
          '&:before': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.42)',
          },
        },
        root: {
          '& svg': {
            fill: '#eee',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
