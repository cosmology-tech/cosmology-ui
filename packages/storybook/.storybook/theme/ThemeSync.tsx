import React, { useEffect, useState } from 'react';
import addons from '@storybook/addons';
import { UPDATE_GLOBALS, STORY_ARGS_UPDATED } from '@storybook/core-events';
import { EVENTS } from './constants';
import { useTheme, Themes, themeList } from '@cosmology-ui/react';
import { colors } from '@cosmology-ui/theme/src/foundations/colors';
import { StoryContext } from '@storybook/react';

export const ThemeSync = ({ context }: { context: StoryContext }) => {
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
    if (context) {
      document.body.setAttribute('data-theme', theme);
    }
    if (context.viewMode === 'docs') {
      setTheme(Themes.Light);
    }
    if (context.viewMode === 'story') {
      const storedTheme = localStorage.getItem('cosmology-ui-storybook-theme');
      const current = themeList.filter(({ name }) => {
        if (!storedTheme) return theme === name;
        if (storedTheme) return storedTheme === name;
      })[0];
      channel.emit(EVENTS.CHANGE_THEME, current.name);
      setTheme(current.name);
    }
  }, [context, theme]);

  return null;
};
