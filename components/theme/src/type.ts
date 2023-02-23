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

export type StyleDataType = {
  componentName: string;
  category: string;
  style: string;
  theme: { themeName: string; themeValue: string }[];
};

export type ThemeListType = {
  name: string;
  displayColor: string;
  colorMode: string;
};
