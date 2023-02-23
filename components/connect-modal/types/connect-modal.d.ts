/// <reference types="react" />
import { Themes } from '@cosmology-ui/theme';
import { ConnectModalType } from './type';
export declare const ConnectModalBaseStyle: (theme: Themes) => {
    position: string;
    alignSelf: string;
    overflow: string;
    borderRadius: string;
    w: string;
    mx: number;
    bg: string;
    color: string;
    _focus: {
        outline: string;
    };
};
export declare const ConnectModal: ({ initialRef, modalView, className, styleProps, modalOpen, modalOnClose }: ConnectModalType) => JSX.Element;
