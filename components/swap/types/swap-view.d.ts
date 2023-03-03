/// <reference types="react" />
import { SwapViewType } from './type';
export declare const SwapViewBaseStyle: (theme: string) => {
    '>.swap-tolerance-box': {
        justifyContent: string;
        alignItems: string;
        fontSize: string;
        py: number;
        '>.swap-tolerance-title': {
            flex: number;
            color: string;
        };
        '>.swap-tolerance-value': {
            color: string;
            fontWeight: string;
            mr: number;
        };
    };
    '>.swap-price-box': {
        justifyContent: string;
        alignItems: string;
        py: number;
        '>.swap-price-title': {
            flex: number;
            fontSize: string;
            color: string;
        };
        '>.swap-price-value': {
            fontSize: string;
            '>.swap-skeleton-box': {
                alignItems: string;
                '>.swap-skeleton-amount': {
                    width: number;
                    height: number;
                    mr: number;
                };
                '>.swap-price-fiat': {
                    color: string;
                };
                '>.swap-skeleton-fiat': {
                    width: number;
                    height: number;
                };
            };
            '>.swap-price-amount': {
                mr: number;
                fontWeight: string;
                color: string;
            };
            '>.swap-price-fiat': {
                color: string;
            };
        };
    };
    '>.swap-submit-button': {
        w: string;
        h: string;
        p: number;
        py: number;
        mt: number;
        bg: string;
        color: string;
        boxShadow: string;
        _hover: {
            bg: string;
        };
        _active: {
            bg: string;
            color: string;
        };
        _focus: {
            boxShadow: string;
        };
        _disabled: {
            bg: string;
            color: string;
            _hover: {
                bg: string;
            };
            _active: {
                bg: string;
            };
            _focus: {
                boxShadow: string;
            };
        };
    };
};
export declare const SwapView: ({ dropdownData, fromDropdownLoading, fromInputLoading, fromToken, toDropdownLoading, toInputLoading, toToken, amountValue, fiatValue, tokenArray, settingToken, priceValue, submitDisabled, className, styleProps, onAmountInputChange, onFromDropdownChange, onToDropdownChange, onSwapSwitch, onSelectSetting, onSwapSubmit }: SwapViewType) => JSX.Element;
