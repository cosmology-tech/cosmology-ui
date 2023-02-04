export declare type ThemeContextType = {
    theme: string;
    handleTheme: (theme: string) => void;
};
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
    name: string;
    displayColor: string;
    colorMode: string;
};
