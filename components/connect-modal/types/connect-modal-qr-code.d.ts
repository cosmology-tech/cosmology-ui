/// <reference types="react" />
import { QRCodeDisplayErrorType, QRCodeType } from './type';
export declare const ConnectModalQRCodeSkeleton: () => JSX.Element;
export declare const ConnectModalQRCodeDisplayError: ({ theme, qrCodeSize, onRefresh }: QRCodeDisplayErrorType) => JSX.Element;
export declare const ConnectModalQRCodeBaseStyle: (theme: string) => {
    w: number;
    justifyContent: string;
    alignItems: string;
    spacing: number;
    p: number;
    pb: number;
    '>.connect-modal-qr-code-description': {
        fontWeight: string;
        textAlign: string;
        color: string;
        opacity: number;
        px: number;
        pb: number;
    };
    '>.connect-modal-qr-code-box': {
        position: string;
        w: string;
        border: string;
        borderColor: string;
        borderRadius: string;
        boxShadow: string;
        p: number;
        '>.connect-modal-qr-code-svg': {
            opacity: number;
        };
        '>.connect-modal-qr-code-refresh-button-box': {
            position: string;
            zIndex: number;
            '>.connect-modal-qr-code-refresh-button': {
                bg: string;
                color: string;
                borderRadius: string;
                boxShadow: string;
            };
        };
        '>.connect-modal-qr-code-blur': {
            position: string;
            zIndex: number;
            w: string;
            h: string;
            borderRadius: string;
            bg: string;
        };
    };
    '>.connect-modal-qr-code-error-title': {
        fontWeight: string;
        textAlign: string;
        pt: number;
        '&.connect-modal-qr-code-error': {
            color: string;
        };
        '&.connect-modal-qr-code-expired': {
            color: string;
        };
    };
    '>.connect-modal-qr-code-error-desc-box': {
        position: string;
        '>.connect-modal-qr-code-error-desc': {
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
        '>.connect-modal-qr-code-error-desc-animate-shadow': {
            position: string;
            left: number;
            bottom: number;
            w: string;
            bg: string;
        };
    };
};
export declare const ConnectModalQRCode: ({ qrCodeStatus, link, description, qrCodeSize, errorTitle, errorDesc, className, styleProps, onRefresh }: QRCodeType) => JSX.Element;
