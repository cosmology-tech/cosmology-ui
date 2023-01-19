import { extendTheme } from '@chakra-ui/react';

import { semanticTokens } from './component-themes';

const fonts = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
};

const breakPoints = {
  breakPoints: {
    sm: '360px',
    md: '414px',
    lg: '768px',
  },
};

const colors = {
  colors: {
    primary: {
      '50': '#e5e7f9',
      '100': '#bec4ef',
      '200': '#929ce4',
      '300': '#6674d9',
      '400': '#4657d1',
      '500': '#2539c9',
      '600': '#2133c3',
      '700': '#1b2cbc',
      '800': '#1624b5',
      '900': '#0d17a9',
    },
  },
};

export const defaultTheme = extendTheme(
  fonts,
  breakPoints,
  colors,
  semanticTokens
);
