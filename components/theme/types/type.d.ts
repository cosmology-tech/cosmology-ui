export declare enum Themes {
    Light = "light",
    Dark = "dark"
}
export interface ThemeContextType {
    theme: Themes;
    setTheme: (theme: Themes) => void;
}
export interface ThemeContextReducerAction {
    theme: Themes;
}
export declare type StyleDataType = {
    componentName: string;
    category: string;
    style: string;
    theme: {
        themeName: string;
        themeValue: string;
    }[];
};
export declare type ThemeListType = {
    name: Themes;
    displayColor: string;
    colorMode: string;
};
