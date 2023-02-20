import { useColorMode } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import addons from '@storybook/addons';
import { EVENTS } from './constants';
import { ThemeContext, themeList, Themes } from '@cosmology-ui/react';

export const ThemeSync = ({ viewMode }: { viewMode: 'story' | 'docs' }) => {
  const { setColorMode } = useColorMode();
  const { theme, setTheme: handleTheme } = useContext(ThemeContext);
  const channel = addons.getChannel();

  useEffect(() => {
    // update when selected a theme
    const themeToolCallback = (value: Themes) => {
      handleTheme(value);
      localStorage.setItem('cosmology-ui-storybook-theme', value);
      themeList.map(({ name, colorMode }) => {
        if (value === name) {
          setColorMode(colorMode);
        }
      });
    };

    // call the function when selecting theme
    channel.on(EVENTS.CHANGE_THEME, themeToolCallback);

    return () => {
      // remove event listener
      channel.removeListener(EVENTS.CHANGE_THEME, themeToolCallback);
    };
  }, []);

  useEffect(() => {
    // update theme provider and color mode when view mode changed
    if (viewMode === 'docs') {
      setColorMode('light');
      handleTheme(Themes.Light);
    }
    if (viewMode === 'story') {
      const storedTheme = localStorage.getItem('cosmology-ui-storybook-theme');
      const current = themeList.filter(({ name }) => {
        if (!storedTheme) return theme === name;
        if (storedTheme) return storedTheme === name;
      })[0];
      channel.emit(EVENTS.CHANGE_THEME, current.name);
      setColorMode(current.colorMode);
      handleTheme(current.name);
    }
  }, [viewMode, setColorMode]);

  useEffect(() => {
    function handleThemeChange() {
      localStorage.removeItem('cosmology-ui-storybook-theme');
    }
    window.addEventListener('beforeunload', handleThemeChange);

    return () => {
      window.addEventListener('beforeunload', handleThemeChange);
    };
  }, []);

  return null;
};
