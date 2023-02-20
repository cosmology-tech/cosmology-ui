/// <reference types="react" />
import { SimpleConnectModalType } from '../../index';
export declare const SimpleConnectModalBaseStyle: (theme: string) => {
    position: string;
    alignSelf: string;
    borderRadius: string;
    overflow: string;
    w: string;
    mx: number;
    bg: string;
    color: string;
    _focus: {
        outline: string;
    };
};
export declare const SimpleConnectModal: ({ initialRef, modalView, className, styleProps, modalOpen, modalOnClose }: SimpleConnectModalType) => JSX.Element;
