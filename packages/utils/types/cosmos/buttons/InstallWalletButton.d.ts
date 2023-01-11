/// <reference types="react" />
import { InstallWalletButtonType } from '../../index';
export declare const InstallWalletButtonBaseStyle: (theme: string) => {
    w: string;
    h: string;
    py: number;
    display: string;
    justifyContent: string;
    alignItems: string;
    whiteSpace: string;
    fontWeight: string;
    fontSize: string;
    border: string;
    borderColor: string;
    color: string;
    bg: string;
    boxShadow: string;
    _hover: {
        opacity: number;
    };
    _active: {
        opacity: number;
    };
    _focus: {
        outline: string;
    };
    _disabled: {
        opacity: number;
        cursor: string;
        _hover: {
            opacity: number;
        };
        _active: {
            opacity: number;
        };
    };
};
export declare const InstallWalletButton: ({ icon, buttonText, disabled, className, styleProps, onClick }: InstallWalletButtonType) => JSX.Element;
