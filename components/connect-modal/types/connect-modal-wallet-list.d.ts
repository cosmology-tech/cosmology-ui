/// <reference types="react" />
import { DisplayWalletListType } from './type';
export declare const ConnectModalWalletListBaseStyle: (theme: string) => {
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
    pt: number;
    pb: number;
    px: number;
    mt: number;
    scrollbarWidth: string;
    '::-webkit-scrollbar': {
        display: string;
    };
    '&.connect-modal-wallet-list-single': {
        justifyContent: string;
        gridTemplateColumns: {
            base: string;
            md: string;
        };
    };
    '>.connect-modal-wallet-list-item': {
        display: string;
        gridColumn: string;
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
        textAlign: string;
        transition: string;
        color: string;
        bg: string;
        _hover: {
            boxShadow: string;
            bg: string;
            '&.connect-modal-wallet-list-item-square>.connect-modal-wallet-list-icon>.connect-modal-wallet-list-sub-icon-small': {
                borderColor: string;
            };
        };
        _focus: {
            borderRadius: string;
            boxShadow: string;
        };
        '&.connect-modal-wallet-list-item-single': {
            gridColumn: {
                base: string;
                md: string;
            };
        };
        '&.connect-modal-wallet-list-item-square': {
            flexDirection: {
                base: string;
                md: string;
            };
            textAlign: {
                base: string;
                md: string;
            };
            justifyContent: string;
            py: {
                md: number;
            };
            mt: {
                md: number;
            };
            '>.connect-modal-wallet-list-icon': {
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
                '>.connect-modal-wallet-list-sub-icon-small': {
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
        };
        '>.connect-modal-wallet-list-icon': {
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
        };
        '>.connect-modal-wallet-list-sub-icon': {
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
    };
    '~.connect-modal-wallet-list-animate-shadow': {
        position: string;
        bottom: number;
        w: string;
        background: string;
    };
};
export declare const ConnectModalWalletListBaseShadowAnimate: (displayBlur: boolean) => {
    opacity: number;
    height: number;
    transition: {
        type: string;
        duration: number;
    };
};
export declare const ConnectModalWalletList: ({ initialFocus, walletsData, className, styleProps, shadowAnimateProps }: DisplayWalletListType) => JSX.Element;
