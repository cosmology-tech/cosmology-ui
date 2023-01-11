/// <reference types="react" />
import { ButtonShape, DisplayWalletListType } from '../../index';
export declare const SimpleDisplayWalletListBaseStyle: (theme: string, dataLength: number) => {
    position: string;
    justifyContent: string;
    gridTemplateColumns: {
        base: string;
        md: string;
    };
    gridTemplateRows: {
        base: string;
        md: string;
    };
    columnGap: number;
    rowGap: number;
    maxH: number;
    minH: number;
    w: number;
    overflowY: string;
    py: number;
    px: number;
    mt: number;
    scrollbarWidth: string;
    '::-webkit-scrollbar': {
        display: string;
    };
    '~.simple-display-wallet-list-animate-shadow': {
        position: string;
        bottom: number;
        w: string;
        background: string;
    };
};
export declare const SimpleDisplayWalletListItemBaseStyle: (theme: string, buttonShape: ButtonShape, index: number) => {
    gridColumn: {
        base: string;
        md: string;
    };
    display: string;
    flexDirection: {
        base: string;
        md: string;
    };
    justifyContent: string;
    alignItems: string;
    position: string;
    w: string;
    h: string;
    p: number;
    py: {
        md: number;
    };
    mt: {
        md: number;
    };
    borderRadius: string;
    whiteSpace: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: number;
    textAlign: {
        base: string;
        md: string;
    };
    transition: string;
    color: string;
    bg: string;
    _hover: {
        boxShadow: string;
        bg: string;
    };
    _focus: {
        borderRadius: string;
        boxShadow: string;
    };
    '>.simple-display-wallet-list-icon': {
        position: string;
        mr: {
            base: number;
            md: number;
        };
        mb: {
            base: number;
            md: number;
        };
        w: {
            base: number;
            md: number;
        };
        h: {
            base: number;
            md: number;
        };
        minW: {
            base: number;
            md: number;
        };
        minH: {
            base: number;
            md: number;
        };
        maxW: {
            base: number;
            md: number;
        };
        maxH: {
            base: number;
            md: number;
        };
        '>.simple-display-wallet-list-sub-icon': {
            display: string;
            justifyContent: string;
            alignItems: string;
            overflow: string;
            border: string;
            bg: string;
            borderColor: string;
            borderRadius: string;
            position: string;
            bottom: number;
            right: number;
            mr: number;
            w: number;
            h: number;
            minW: number;
            minH: number;
            maxW: number;
            maxH: number;
        };
    };
    '>.simple-display-wallet-list-sub-icon': {
        display: string;
        justifyContent: string;
        alignItems: string;
        overflow: string;
        border: string;
        borderRadius: string;
        position: string;
        bottom: number;
        right: number;
        mr: number;
        w: number;
        h: number;
        minW: number;
        minH: number;
        maxW: number;
        maxH: number;
    };
    '+.simple-display-wallet-wallet-button:hover>.simple-display-wallet-list-icon>.simple-display-wallet-list-sub-icon': {
        bg: string;
        borderColor: string;
    };
};
export declare const SimpleDisplayWalletListAnimateBaseStyle: (theme: string) => {
    position: string;
    bottom: number;
    w: string;
    background: string;
};
export declare const SimpleDisplayWalletListBaseShadowAnimate: (displayBlur: boolean) => {
    opacity: number;
    height: number;
    transition: {
        type: string;
        duration: number;
    };
};
export declare const SimpleDisplayWalletList: ({ initialFocus, walletsData, className, styleProps, shadowAnimateProps }: DisplayWalletListType) => JSX.Element;
