import React, { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: string;
  handleTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  handleTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const defaultThemeValue = {
    theme: 'light',
    handleTheme: (theme: string) => {
      setCurrentTheme(theme);
      localStorage.setItem('current-theme', theme);
    }
  };
  const [theme, setTheme] = useState(defaultThemeValue);

  useEffect(() => {
    if (!localStorage.getItem('current-theme')) {
      localStorage.setItem('current-theme', 'light');
      setCurrentTheme('light');
    }

    window.addEventListener(
      'storage',
      () => {
        const current = localStorage.getItem('current-theme');
        setCurrentTheme(current);
      },
      false
    );
  }, []);

  useEffect(() => {
    setTheme((pre) => ({
      ...pre,
      theme: currentTheme
    }));
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
