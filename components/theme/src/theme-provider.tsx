import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { defaultTheme } from './defaultTheme';
import { ThemeContextReducerAction, ThemeContextType, Themes } from './types';

function handleThemeChange(
  state: ThemeContextType,
  action: ThemeContextReducerAction
): ThemeContextType {
  if (action.theme !== state.theme) {
    return {
      ...state,
      theme: action.theme
    };
  }
  return state;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Themes.Light,
  setTheme: () => {}
});

export const ThemeProvider = ({
  theme = defaultTheme,
  children
}: {
  theme: object;
  children: ReactNode;
}) => {
  const [currentTheme, updateCurrentTheme] = useReducer(handleThemeChange, {
    theme: Themes.Light,
    setTheme: (value: Themes) => {
      updateCurrentTheme({ theme: value });
      localStorage.setItem('cosmology-ui-theme', value);
    }
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem('cosmology-ui-theme');
    if (storedTheme && currentTheme.theme !== storedTheme) {
      currentTheme.setTheme(storedTheme as unknown as Themes);
    }
    if (!storedTheme) {
      currentTheme.setTheme(currentTheme.theme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <StyledThemeProvider theme={{ mode: currentTheme.theme, ...theme }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('You have forgot to use ThemeProvider.');
  }

  return context;
};
