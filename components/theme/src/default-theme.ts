// import { DefaultTheme } from 'styled-components';

import { componentThemes } from './components';
import {
  borderStyle,
  borderWidth,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  shadows,
  sizes,
  space
} from './foundations';
import { ComponentsThemeType, GeneralThemeType } from './types';

interface DefaultTheme extends GeneralThemeType, ComponentsThemeType {}

export const generalTheme: GeneralThemeType = {
  borderWidth,
  borderStyle,
  breakpoints,
  colors,
  radii,
  shadows,
  space,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights
};

export const defaultTheme: DefaultTheme = {
  ...generalTheme,
  ...componentThemes
};
