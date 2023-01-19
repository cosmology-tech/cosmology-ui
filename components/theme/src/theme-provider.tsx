import React, { createContext, ReactNode, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  handleTheme: (theme: string) => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const defaultThemeValue = {
    theme: 'light',
    handleTheme: (theme: string) => setCurrentTheme(theme)
  };
  const [theme, setTheme] = useState(defaultThemeValue);

  useEffect(() => {
    if (!sessionStorage.getItem('current-theme')) {
      sessionStorage.setItem('current-theme', 'light');
      setCurrentTheme('light');
    }

    window.addEventListener(
      'storage',
      () => {
        const current = sessionStorage.getItem('current-theme');
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
