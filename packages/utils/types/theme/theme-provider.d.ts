import React, { ReactNode } from 'react';
interface ThemeContextType {
    theme: string;
    handleTheme: (theme: string) => void;
}
export declare const ThemeContext: React.Context<ThemeContextType>;
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export {};
