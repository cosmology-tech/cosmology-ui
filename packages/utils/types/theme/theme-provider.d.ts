import React, { ReactNode } from 'react';
export declare const ThemeContext: React.Context<{
    theme: string;
    handleTheme: (theme: string) => void;
}>;
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
