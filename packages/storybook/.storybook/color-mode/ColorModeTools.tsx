import { useAddonState } from '@storybook/api';
import { IconButton } from '@storybook/components';
import { addons } from '@storybook/addons';
import { RiSunLine, RiMoonFill } from 'react-icons/ri';
import { ADDON_ID, EVENTS } from './constants';
import React from 'react';

/**
 * This component is rendered in the Storybook toolbar
 */
export const ColorModeTool = () => {
  const isDarkMode = localStorage.getItem('chakra-ui-color-mode') === 'dark';
  const [darkMode, setDarkMode] = useAddonState(
    `${ADDON_ID}/dark-mode`,
    isDarkMode
  );

  const channel = addons.getChannel();

  const toggleDarkMode = () => {
    sessionStorage.setItem('current-color-mode', !darkMode ? 'dark' : 'light'); // to store preview color mode
    channel.emit(EVENTS.TOGGLE_COLOR_MODE, !darkMode ? 'dark' : 'light');
    setDarkMode(!darkMode);
  };

  return (
    <IconButton
      title={`Set color mode to ${darkMode ? 'light' : 'dark'}`}
      onClick={toggleDarkMode}
    >
      {darkMode ? <RiSunLine /> : <RiMoonFill />}
    </IconButton>
  );
};
