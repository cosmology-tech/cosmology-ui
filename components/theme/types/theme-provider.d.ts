import React, { ReactNode } from 'react';
import { ThemeContextType } from './type';
export declare const ThemeContext: React.Context<ThemeContextType>;
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
