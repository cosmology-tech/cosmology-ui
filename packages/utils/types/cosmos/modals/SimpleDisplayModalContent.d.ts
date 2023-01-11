/// <reference types="react" />
import { ConnectModalContentType, LogoStatus } from '../../index';
export declare const SimpleDisplayModalContentBaseStyle: (theme: string, status: LogoStatus) => {
    w: number;
    flexDirection: string;
    alignItems: string;
    justifyContent: string;
    textAlign: string;
    px: number;
    pt: number;
    pb: number;
    '>.modal-content-logo': {
        position: string;
        mx: string;
        w: number;
        h: number;
        minW: number;
        minH: number;
        maxW: number;
        maxH: number;
        mb: number;
        '>.modal-content-logo-status': {
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
        '>.modal-content-image': {
            p: number;
        };
    };
    '>.modal-content-header': {
        fontWeight: string;
        color: string;
    };
    '>.modal-content-description': {
        position: string;
        '>.modal-content-description-box': {
            fontSize: string;
            lineHeight: number;
            opacity: number;
            whiteSpace: string;
            px: number;
            pt: number;
            maxH: number;
            overflowY: string;
            scrollbarWidth: string;
            '&::-webkit-scrollbar': {
                display: string;
            };
        };
        '>.modal-content-description-animate-shadow': {
            position: string;
            left: number;
            bottom: number;
            w: string;
            bg: string;
        };
    };
    '>.modal-content-username': {
        alignItems: string;
        fontSize: string;
        fontWeight: string;
        '>.modal-content-username-image': {
            w: number;
            h: number;
            minW: number;
            minH: number;
            maxW: number;
            maxH: number;
        };
    };
    '>.modal-content-address-button': {
        w: string;
        pt: number;
        px: number;
    };
    '>.modal-content-bottom-button': {
        w: string;
        pt: number;
        px: number;
    };
    '>.modal-content-bottom-link': {
        w: string;
        pt: number;
    };
};
export declare const SimpleDisplayModalContent: ({ status, logo, contentHeader, contentDesc, username, walletIcon, addressButton, bottomButton, bottomLink, className, styleProps }: ConnectModalContentType) => JSX.Element;
