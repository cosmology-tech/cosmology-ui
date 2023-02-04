/// <reference types="react" />
import { ConnectModalContentType } from './type';
export declare const ConnectModalContentBaseStyle: (theme: string) => {
    w: number;
    flexDirection: string;
    alignItems: string;
    justifyContent: string;
    textAlign: string;
    px: number;
    pt: number;
    pb: number;
    '&.connect-modal-loading': {
        mb: number;
    };
    '>.connect-modal-content-logo': {
        position: string;
        mx: string;
        '&.connect-modal-logo-img': {
            w: number;
            h: number;
            minW: number;
            minH: number;
            maxW: number;
            maxH: number;
            mt: number;
            mb: number;
        };
        '&.connect-modal-logo-svg': {
            w: number;
            h: number;
            minW: number;
            minH: number;
            maxW: number;
            maxH: number;
            mt: number;
            mb: number;
        };
        '>.connect-modal-content-loading': {
            position: string;
            top: number;
            right: number;
            bottom: number;
            left: number;
            border: string;
            borderTopColor: string;
            borderBottomColor: string;
            borderLeftColor: string;
            borderRightColor: string;
            borderRadius: string;
        };
        '>.connect-modal-content-logo-status': {
            position: string;
            top: number;
            right: number;
            bottom: number;
            left: number;
            border: string;
            borderRadius: string;
            '&.connect-modal-content-warning': {
                borderTopColor: string;
                borderBottomColor: string;
                borderLeftColor: string;
                borderRightColor: string;
            };
            '&.connect-modal-content-error': {
                borderTopColor: string;
                borderBottomColor: string;
                borderLeftColor: string;
                borderRightColor: string;
            };
        };
        '>.connect-modal-content-image': {
            '>svg': {
                p: number;
            };
            '>img': {
                p: number;
            };
        };
    };
    '>.connect-modal-content-header': {
        fontWeight: string;
        '&.connect-modal-content-loading': {
            color: string;
        };
        '&.connect-modal-content-warning': {
            color: string;
        };
        '&.connect-modal-content-error': {
            color: string;
        };
    };
    '>.connect-modal-content-description': {
        mt: number;
        mb: number;
        position: string;
        '>.connect-modal-content-description-box': {
            fontSize: string;
            lineHeight: string;
            opacity: number;
            whiteSpace: string;
            px: number;
            maxH: number;
            overflowY: string;
            scrollbarWidth: string;
            '&::-webkit-scrollbar': {
                display: string;
            };
        };
        '>.connect-modal-content-description-animate-shadow': {
            position: string;
            left: number;
            bottom: number;
            w: string;
            bg: string;
        };
    };
    '>.connect-modal-content-username': {
        mb: number;
        alignItems: string;
        fontSize: string;
        fontWeight: string;
        '>.connect-modal-content-username-image': {
            w: number;
            h: number;
            minW: number;
            minH: number;
            maxW: number;
            maxH: number;
        };
    };
    '>.connect-modal-content-address-button': {
        w: string;
        pt: number;
        px: number;
    };
    '>.connect-modal-content-bottom-button': {
        w: string;
        pt: number;
        pb: number;
        px: number;
    };
    '>.connect-modal-content-bottom-link': {
        pt: number;
        opacity: number;
        fontSize: string;
        textDecoration: string;
        _hover: {
            opacity: number;
        };
    };
};
export declare const ConnectModalContent: ({ status, logo, contentHeader, contentDesc, username, walletIcon, addressButton, bottomButton, bottomLink, className, styleProps }: ConnectModalContentType) => JSX.Element;
