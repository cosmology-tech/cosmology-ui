import React, { ReactNode } from 'react';
declare type ThemeContextType = {
    theme: string;
    handleTheme: (theme: string) => void;
};
export declare const ThemeContext: React.Context<ThemeContextType>;
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export {};
