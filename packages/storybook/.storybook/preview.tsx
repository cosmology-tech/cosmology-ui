import { StoryContext } from '@storybook/react';
import * as NextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import React from 'react';

import { defaultTheme, ThemeProvider } from '@cosmology-ui/react';
import { ThemeSync } from './theme/ThemeSync';
import './preview.css';

const OriginalNextImage = NextImage.default;

// 🛠 fix storybook can't seem to find the statically image from public directory
// https://dev.to/jonasmerlin/how-to-use-the-next-js-image-component-in-storybook-1415
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
});

export const parameters = {
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
        name: 'sm (iphone 5/5S/5C/SE)',
        styles: {
          width: '320px',
          height: '568px'
        }
      },
      'mobile-md': {
        name: 'md (android)',
        styles: {
          width: '360px',
          height: '800px'
        }
      },
      'mobile-lg': {
        name: 'lg (iphone 6S+/7+/8+/11/11Pro/11Pro Max/XR/XS Max)',
        styles: {
          width: '414px',
          height: '896px'
        }
      },
      table: {
        name: 'xl (ipad/ipad mini)',
        styles: {
          width: '768px',
          height: '1024px'
        }
      },
      desktop: {
        name: '2xl (desktop)',
        styles: {
          width: '1280px',
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

const withThemeProvider = (StoryFn: Function, context: StoryContext) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ThemeSync context={context} />
      <StoryFn {...context} />
    </ThemeProvider>
  );
};

// add theme provider in storybook
export const decorators = [withThemeProvider];
