import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState, useEffect} from 'react';

const withTheme = Child => props => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('mode') || 'light');
  const getTheme = () => {
    return createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: themeMode === 'light' ? '#1d4998' : '#90caf9',
        },
        secondary: {
          main: '#ececeb',
        },
        darker: {
          main: themeMode === 'light' ? '#ececeb' : '#222a3a',
        }
      }
    });
  };
  const [theme, setTheme] = useState(getTheme);
  useEffect(() => {
    setTheme(getTheme());
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <Child {...props} setThemeMode={setThemeMode} theme={theme} />
    </ThemeProvider>
  );
};

export default withTheme;