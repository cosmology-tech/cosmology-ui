import { ChakraProvider } from '@chakra-ui/react';
import { StoryContext } from '@storybook/react';
import * as NextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import React from 'react';

import { defaultTheme, ThemeProvider } from '@cosmology-ui/utils';
// import { ColorModeSync } from './color-mode/ColorModeSync';
import { ThemeSync } from './theme/ThemeSync';

const OriginalNextImage = NextImage.default;

// 🛠 fix storybook can't seem to find the statically image from public directory
// https://dev.to/jonasmerlin/how-to-use-the-next-js-image-component-in-storybook-1415
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
});

export const parameters = {
  chakra: {
    theme: defaultTheme
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true
    }
  },
  viewport: {
    //👇 https://gs.statcounter.com/screen-resolution-stats
    viewports: {
      'mobile-sm': {
        name: 'mobile(sm)',
        styles: {
          width: '360px',
          height: '800px'
        }
      },
      'mobile-lg': {
        name: 'mobile(lg)',
        styles: {
          width: '414px',
          height: '896px'
        }
      },
      table: {
        name: 'table',
        styles: {
          width: '768px',
          height: '1024px'
        }
      }
    }
  },
  nextRouter: {
    Provider: RouterContext.Provider
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

const withChakraProvider = (StoryFn: Function, context: StoryContext) => {
  return (
    <ThemeProvider>
      <ChakraProvider theme={defaultTheme} resetCSS={true}>
        {/* <ColorModeSync viewMode={context.viewMode} /> */}
        <ThemeSync viewMode={context.viewMode} />
        <StoryFn {...context} />
      </ChakraProvider>
    </ThemeProvider>
  );
};

// add chakra provider in storybook
export const decorators = [withChakraProvider];
