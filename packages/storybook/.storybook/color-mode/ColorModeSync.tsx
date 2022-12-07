import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { addons } from '@storybook/addons';
import { EVENTS } from './constants';

/**
 * Render <ColorModeSync /> to sync the storybook color mode with Chakra UI
 */
export function ColorModeSync({ viewMode }: { viewMode: 'story' | 'docs' }) {
  const { setColorMode } = useColorMode();
  const channel = addons.getChannel();

  useEffect(() => {
    const colorModeToolCallback = (value: string) => {
      setColorMode(value);
    };

    channel.on(EVENTS.TOGGLE_COLOR_MODE, colorModeToolCallback);

    return () => {
      channel.removeListener(EVENTS.TOGGLE_COLOR_MODE, colorModeToolCallback);
    };
  }, [setColorMode]);

  useEffect(() => {
    if (viewMode === 'docs') setColorMode('light');
    if (viewMode === 'story') {
      if (!sessionStorage.getItem('current-color-mode')) setColorMode('light'); // set default color mode at first render
      if (sessionStorage.getItem('current-color-mode'))
        setColorMode(sessionStorage.getItem('current-color-mode'));
    }
  }, [viewMode]);

  return null;
}
