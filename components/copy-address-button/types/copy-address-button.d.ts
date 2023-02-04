/// <reference types="react" />
import { CopyAddressType } from './type';
export declare const CopyAddressButtonBaseStyle: (theme: string, hasCopied: boolean) => {
    display: string;
    alignItems: string;
    justifyContent: string;
    fontSize: string;
    fontWeight: string;
    letterSpacing: string;
    lineHeight: number;
    borderRadius: string;
    border: string;
    borderColor: string;
    w: string;
    h: string;
    minH: number;
    px: number;
    color: string;
    transition: string;
    _hover: {
        bg: string;
        opacity: number;
    };
    _focus: {
        boxShadow: string;
    };
    _loading: {
        cursor: string;
    };
    _disabled: {
        opacity: number;
        cursor: string;
        _hover: {
            bg: string;
            opacity: number;
        };
        _active: {
            boxShadow: string;
        };
        _focus: {
            boxShadow: string;
        };
    };
    '>.copy-address-button-icon': {
        opacity: number;
        ml: number;
        color: string;
    };
};
export declare const CopyAddressButton: ({ address, loading, disabled, className, styleProps, maxDisplayLength }: CopyAddressType) => JSX.Element;
