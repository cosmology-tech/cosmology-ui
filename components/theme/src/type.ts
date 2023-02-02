export type ThemeContextType = {
  theme: string;
  handleTheme: (theme: string) => void;
};

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
