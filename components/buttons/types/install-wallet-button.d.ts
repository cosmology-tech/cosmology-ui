/// <reference types="react" />
import { BaseButtonType } from './button-base-type';
export declare const InstallWalletButtonBaseStyle: (theme: string) => {
    px: number;
    w: string;
    h: string;
    minH: number;
    display: string;
    alignItems: string;
    whiteSpace: string;
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
    _loading: {
        cursor: string;
    };
    '.install-wallet-button-left-icon': {
        mr: number;
    };
    '.install-wallet-button-right-icon': {
        ml: number;
    };
};
export declare const InstallWalletButton: ({ buttonText, loading, disabled, leftIcon, rightIcon, className, onClick }: BaseButtonType) => JSX.Element;
