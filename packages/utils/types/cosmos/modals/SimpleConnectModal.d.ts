/// <reference types="react" />
import { SimpleConnectModalType } from '../../index';
export declare const SimpleConnectModalBaseStyle: () => {
    position: string;
    alignSelf: string;
    borderRadius: string;
    w: string;
    mx: number;
    _focus: {
        outline: string;
    };
    overflow: string;
};
export declare const SimpleConnectModal: ({ initialRef, modalView, className, styleProps, modalOpen, modalOnClose }: SimpleConnectModalType) => JSX.Element;
