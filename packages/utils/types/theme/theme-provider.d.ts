import React, { ReactNode } from 'react';
import { Themes } from '../utils/types';
export interface ThemeContextType {
    theme: Themes;
    setTheme: (theme: Themes) => void;
}
export declare const ThemeContext: React.Context<ThemeContextType>;
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export declare const useTheme: () => ThemeContextType;
