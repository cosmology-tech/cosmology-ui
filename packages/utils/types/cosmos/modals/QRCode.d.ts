/// <reference types="react" />
import { QRCodeDisplayErrorType, QRCodeStatus, QRCodeType } from '../../index';
export declare const QRCodeSkeleton: () => JSX.Element;
export declare const QRCodeDisplayError: ({ theme, qrCodeSize, onRefresh }: QRCodeDisplayErrorType) => JSX.Element;
export declare const QRCodeBaseStyle: (theme: string, status: QRCodeStatus) => {
    w: number;
    justifyContent: string;
    alignItems: string;
    spacing: number;
    p: number;
    pb: number;
    '>.qr-code-description': {
        fontWeight: string;
        textAlign: string;
        opacity: number;
        px: number;
        pb: number;
    };
    '>.qr-code': {
        position: string;
        w: string;
        border: string;
        borderColor: string;
        borderRadius: string;
        boxShadow: string;
        p: number;
        '>.qr-code-refresh-button-box': {
            position: string;
            w: string;
            h: string;
            zIndex: number;
            '>.qr-code-refresh-button': {
                bg: string;
                color: string;
                borderRadius: string;
                boxShadow: string;
            };
        };
        '>.qr-code-blur': {
            position: string;
            w: string;
            h: string;
            zIndex: number;
            borderRadius: string;
            blur: string;
            bg: string;
        };
        '>.qr-code-svg': {
            opacity: number;
        };
    };
    '>.qr-code-error-title': {
        fontWeight: string;
        textAlign: string;
        pt: number;
        '&.qr-code-error': {
            color: string;
        };
        '&.qr-code-expired': {
            color: string;
        };
    };
    '>.qr-code-error-desc-box': {
        position: string;
        '>.qr-code-error-desc': {
            maxH: number;
            px: number;
            overflowX: string;
            overflowY: string;
            scrollbarWidth: string;
            '&::-webkit-scrollbar': {
                display: string;
            };
            fontSize: string;
            fontWeight: string;
            textAlign: string;
            lineHeight: string;
            opacity: number;
        };
        '>.qr-code-error-desc-animate-shadow': {
            position: string;
            left: number;
            bottom: number;
            w: string;
            bg: string;
        };
    };
};
export declare const QRCode: ({ status, link, description, qrCodeSize, errorTitle, errorDesc, className, styleProps, onRefresh }: QRCodeType) => JSX.Element;
