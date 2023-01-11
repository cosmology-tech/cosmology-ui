/// <reference types="react" />
import { ConnectWalletButtonType } from '../../index';
export declare const ConnectWalletButtonBaseStyle: (theme: string) => {
    display: string;
    alignItems: string;
    px: number;
    w: string;
    h: string;
    minH: number;
    fontSize: string;
    bgColor: string;
    color: string;
    _hover: {
        bg: string;
    };
    _active: {
        bg: string;
        color: string;
        boxShadow: string;
    };
    _focus: {
        boxShadow: string;
    };
    _loading: {
        bg: string;
        color: string;
        cursor: string;
        _hover: {
            bg: string;
            color: string;
            boxShadow: string;
        };
        _active: {
            bg: string;
            color: string;
            boxShadow: string;
        };
        _focus: {
            bg: string;
            color: string;
            boxShadow: string;
        };
    };
    _disabled: {
        opacity: number;
        bg: string;
        color: string;
        cursor: string;
        _hover: {
            bg: string;
            color: string;
            boxShadow: string;
        };
        _active: {
            bg: string;
            color: string;
            boxShadow: string;
        };
        _focus: {
            bg: string;
            color: string;
            boxShadow: string;
        };
    };
};
export declare const ConnectWalletButton: ({ buttonText, loading, disabled, leftIcon, rightIcon, className, styleProps, onClick }: ConnectWalletButtonType) => JSX.Element;
