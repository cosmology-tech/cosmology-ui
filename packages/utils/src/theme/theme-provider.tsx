import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react';

import { logger } from '../utils/logger';
import { Themes } from '../utils/types';
export interface ThemeContextType {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}
interface ThemeContextReducerAction {
  theme: Themes;
}

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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, updateTheme] = useReducer(handleThemeChange, {
    theme: Themes.Light,
    setTheme: (value: Themes) => {
      updateTheme({ theme: value });
      localStorage.setItem('cosmology-ui-theme', value);
    }
  });

  useEffect(() => {
    const currentTheme = localStorage.getItem('cosmology-ui-theme');
    if (currentTheme && theme.theme !== currentTheme) {
      theme.setTheme(currentTheme as unknown as Themes);
    }
    if (!currentTheme) {
      theme.setTheme(theme.theme);
    }
  }, []);

  useEffect(() => {
    logger.INFO('[ThemeProvider] theme ->', theme.theme);
  }, [theme.theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('You have forgot to use ThemeProvider.');
  }

  return context;
};
