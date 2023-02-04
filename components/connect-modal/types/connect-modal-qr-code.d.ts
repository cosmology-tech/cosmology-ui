/// <reference types="react" />
import { QRCodeType } from './type';
export declare const ConnectModalQRCodeSkeleton: () => JSX.Element;
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
        opacity: number;
        px: number;
        pb: number;
    };
    '>.connect-modal-qr-code-box': {
        w: string;
        border: string;
        borderColor: string;
        borderRadius: string;
        boxShadow: string;
        p: number;
    };
};
export declare const ConnectModalQRCode: ({ link, description, qrCodeSize, loading, className, styleProps }: QRCodeType) => JSX.Element;
