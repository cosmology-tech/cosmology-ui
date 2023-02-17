import React, { createContext, ReactNode, useReducer, useState } from 'react';

interface ThemeContextType {
  theme: string;
  handleTheme: (theme: string) => void;
}
interface ThemeContextReducerAction {
  theme: string;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  handleTheme: () => {}
});

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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [theme, updateTheme] = useReducer(handleThemeChange, {
    theme: currentTheme,
    handleTheme: (value: string) => {
      updateTheme({ theme: value });
      setCurrentTheme(value);
    }
  });

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
