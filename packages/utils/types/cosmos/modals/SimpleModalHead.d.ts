/// <reference types="react" />
import { SimpleModalHeadType } from '../../index';
export declare const SimpleModalHeadBaseStyle: (theme: string, backButton: boolean) => {
    w: string;
    alignItems: string;
    h: string;
    mb: number;
    p: number;
    pb: number;
    '>.modal-header-text': {
        flex: number;
        mr: number;
        fontSize: string;
        fontWeight: string;
        textAlign: string;
        color: string;
    };
    '>.icon-button': {
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
export declare const SimpleModalHead: ({ title, backButton, className, styleProps, onBack, onClose }: SimpleModalHeadType) => JSX.Element;
