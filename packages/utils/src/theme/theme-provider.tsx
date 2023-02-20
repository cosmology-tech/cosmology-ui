import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState
} from 'react';

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
  const [currentTheme, setCurrentTheme] = useState(Themes.Light);
  const [theme, updateTheme] = useReducer(handleThemeChange, {
    theme: currentTheme,
    setTheme: (value: Themes) => {
      updateTheme({ theme: value });
      setCurrentTheme(value);
      localStorage.setItem('cosmology-ui-theme', value);
    }
  });

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
