/// <reference types="react" />
import { ConnectModalHeadType } from './type';
export declare const ConnectModalHeadBaseStyle: (theme: string) => {
    w: string;
    alignItems: string;
    h: string;
    mb: number;
    p: number;
    pb: number;
    '>.connect-modal-head-text': {
        mr: number;
        flex: number;
        fontSize: string;
        fontWeight: string;
        textAlign: string;
        color: string;
        '&.connect-modal-head-back-button': {
            mr: number;
        };
    };
    '>.connect-modal-head-icon-button': {
        display: string;
        justifyContent: string;
        alignItems: string;
        borderRadius: string;
        color: string;
        minW: number;
        minH: number;
        maxW: number;
        maxH: number;
        h: number;
        w: number;
        p: number;
        _focus: {
            outline: string;
        };
        '>svg': {
            w: number;
            h: number;
        };
    };
};
export declare const ConnectModalHead: ({ title, backButton, className, styleProps, onBack, onClose }: ConnectModalHeadType) => JSX.Element;
