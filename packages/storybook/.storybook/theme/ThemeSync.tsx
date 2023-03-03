import { useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import addons from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import { EVENTS } from './constants';
import { useTheme, themeList, Themes } from '@cosmology-ui/react';

export const ThemeSync = ({ viewMode }: { viewMode: 'story' | 'docs' }) => {
  const { setColorMode } = useColorMode();
  const { theme, setTheme } = useTheme();
  const channel = addons.getChannel();

  useEffect(() => {
    const handleThemeChange = () => {
      localStorage.removeItem('cosmology-ui-storybook-theme');
    };

    // update when selected a theme
    const themeToolCallback = (value: Themes) => {
      setTheme(value);
      localStorage.setItem('cosmology-ui-storybook-theme', value);
      themeList.map(({ name, colorMode }) => {
        if (value === name) {
          setColorMode(colorMode);
        }
      });
    };

    window.addEventListener('beforeunload', handleThemeChange);
    // call the function when selecting theme
    channel.on(EVENTS.CHANGE_THEME, themeToolCallback);

    return () => {
      window.addEventListener('beforeunload', handleThemeChange);
      // remove event listener
      channel.removeListener(EVENTS.CHANGE_THEME, themeToolCallback);
    };
  }, []);

  useEffect(() => {
    // update theme provider and color mode when view mode changed
    if (viewMode === 'docs') {
      setColorMode('light');
      setTheme(Themes.Light);
    }
    if (viewMode === 'story') {
      const storedTheme = localStorage.getItem('cosmology-ui-storybook-theme');
      const current = themeList.filter(({ name }) => {
        if (!storedTheme) return theme === name;
        if (storedTheme) return storedTheme === name;
      })[0];
      channel.emit(EVENTS.CHANGE_THEME, current.name);
      setColorMode(current.colorMode);
      setTheme(current.name);
    }
  }, [viewMode, setColorMode]);

  return null;
};
