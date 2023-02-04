/// <reference types="react" />
import { ConnectModalType } from './type';
export declare const ConnectModalBaseStyle: () => {
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
export declare const ConnectModal: ({ initialRef, modalView, className, styleProps, modalOpen, modalOnClose }: ConnectModalType) => JSX.Element;
