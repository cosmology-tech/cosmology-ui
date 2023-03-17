import { DefaultTheme } from 'styled-components';

import { _ConnectWalletButtonStyle } from './components';
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
import { GeneralThemeType } from './types';

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

export const componentsTheme: DefaultTheme = {
  ConnectWalletButton: _ConnectWalletButtonStyle
};

export const defaultTheme: DefaultTheme = {
  ...generalTheme,
  ...componentsTheme
};
