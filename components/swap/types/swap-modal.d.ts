/// <reference types="react" />
import { SwapModalType } from './type';
export declare const SwapModalBaseStyle: (theme: string) => {
    bg: string;
    color: string;
    borderRadius: string;
    p: number;
    '>.swap-modal-header': {
        position: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        p: number;
        pb: number;
        '>.swap-modal-title': {
            fontSize: string;
            fontWeight: string;
            lineHeight: string;
        };
        '>.swap-modal-close': {
            top: number;
            right: number;
            p: number;
            w: string;
            h: string;
        };
    };
};
export declare const SwapModal: ({ isOpen, fromConfig, toConfig, slippageConfig, price, submitButtonConfig, onAmountInputChange, onFromDropdownChange, onToDropdownChange, onSwapSwitch, onSwapSubmit, setSelectedSlippage, onClose }: SwapModalType) => JSX.Element;
