/// <reference types="react" />
import { CopyAddressType } from '../../index';
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
    minH: string;
    py: number;
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
        py: number;
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
