type BaseThemeObject = {
  [key: string]: any;
};

// interface Themes {
//   Light: 'light';
//   Dark: 'dark';
// }
// type ThemesArr = Themes[];
export enum Themes {
  Light = 'light',
  Dark = 'dark'
}

export interface ThemeContextType {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export interface ThemeContextReducerAction {
  theme: Themes;
}

export type ThemeListType = {
  name: Themes;
  displayColor: string;
};

export interface GeneralThemeType {
  borderWidth: BaseThemeObject;
  borderStyle: BaseThemeObject;
  breakpoints: BaseThemeObject;
  colors: BaseThemeObject;
  radii: BaseThemeObject;
  shadows: BaseThemeObject;
  space: BaseThemeObject;
  sizes: BaseThemeObject;
  fonts: BaseThemeObject;
  fontSizes: BaseThemeObject;
  fontWeights: BaseThemeObject;
  letterSpacings: BaseThemeObject;
  lineHeights: BaseThemeObject;
}

export const themeList: ThemeListType[] = [
  { name: Themes.Light, displayColor: '#fff' },
  { name: Themes.Dark, displayColor: '#1A202C' }
];
