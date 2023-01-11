/// <reference types="react" />
import { QRCodeType } from '../../index';
export declare const QRCodeSkeleton: () => JSX.Element;
export declare const QRCodeBaseStyle: (theme: string) => {
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
        w: string;
        border: string;
        borderColor: string;
        borderRadius: string;
        boxShadow: string;
        p: number;
    };
};
export declare const QRCode: ({ link, description, qrCodeSize, loading, className, styleProps }: QRCodeType) => JSX.Element;
