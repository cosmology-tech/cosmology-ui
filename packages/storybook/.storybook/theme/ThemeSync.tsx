import { useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import addons from '@storybook/addons';
import { EVENTS } from './constants';
import { themeList } from '@cosmology-ui/utils';

export const ThemeSync = ({ viewMode }: { viewMode: 'story' | 'docs' }) => {
  const { setColorMode } = useColorMode();
  const channel = addons.getChannel();

  useEffect(() => {
    // update color mode when view mode changed
    if (viewMode === 'docs') {
      setColorMode('light');
      sessionStorage.setItem('current-theme', 'light');
    }
    if (viewMode === 'story')
      setColorMode(sessionStorage.getItem('current-theme'));

    // update when selected a theme
    const themeToolCallback = (value: string) => {
      themeList.map(({ name, colorMode }) => {
        if (value === name) setColorMode(colorMode);
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
