import { useColorMode } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import addons from '@storybook/addons';
import { EVENTS } from './constants';
import { ThemeContext, themeList } from '@cosmology-ui/utils';

export const ThemeSync = ({ viewMode }: { viewMode: 'story' | 'docs' }) => {
  const { setColorMode } = useColorMode();
  const { handleTheme } = useContext(ThemeContext);
  const channel = addons.getChannel();

  useEffect(() => {
    // update theme provider and color mode when view mode changed
    if (viewMode === 'docs') {
      setColorMode('light');
      handleTheme('light');
    }
    if (viewMode === 'story') {
      const current = themeList.filter(
        ({ name }) => sessionStorage.getItem('current-theme') === name
      )[0];
      setColorMode(current.colorMode);
      handleTheme(current.name);
    }

    // update when selected a theme
    const themeToolCallback = (value: string) => {
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
  }, [viewMode, setColorMode]);

  return null;
};
