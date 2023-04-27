/// <reference types="react" />
import { SwapDropdownsViewType } from './type';
export declare const SwapDropdownsViewBaseStyle: (theme: string) => {
    position: string;
    display: string;
    flexDirection: string;
    alignItems: string;
    justifyContent: string;
    '>:first-of-type': {
        mb: number;
    };
    '>.swap-switch-button-box': {
        position: string;
        zIndex: number;
        '>.swap-switch-button': {
            display: string;
            alignItems: string;
            justifyContent: string;
            fontSize: string;
            w: string;
            h: string;
            p: number;
            borderRadius: string;
            bg: string;
            border: string;
            borderColor: string;
            color: string;
        };
    };
};
/**
 * From and to Panel with switch button.
 * @see {@link SwapDropdownsViewType}
 */
export declare const SwapDropdownsView: ({ loading, fromToken, toToken, inputData, dropdownData, onSwapSwitch, onFromDropdownChange, onToDropdownChange, onAmountInputChange }: SwapDropdownsViewType) => JSX.Element;
