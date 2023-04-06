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
export declare const SwapModal: ({ isOpen, dropdownData, fromDropdownLoading, fromInputLoading, fromToken, toDropdownLoading, toInputLoading, toToken, inputAmount, inputDollarValue, tokenArray, settingToken, priceValue, submitLoading, submitDisabled, className, styleProps, onClose, onAmountInputChange, onFromDropdownChange, onToDropdownChange, onSwapSwitch, onSelectSetting, onSwapSubmit }: SwapModalType) => JSX.Element;
