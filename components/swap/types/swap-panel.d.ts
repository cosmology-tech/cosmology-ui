/// <reference types="react" />
import { SwapControlPanelType } from './type';
export declare const SwapPanelBaseStyle: (theme: string) => {
    px: number;
    py: number;
    w: string;
    position: string;
    borderRadius: string;
    bg: string;
    color: string;
    '>.swap-header': {
        w: string;
        minH: number;
        mb: number;
        justifyContent: string;
        alignItems: string;
        color: string;
        '>.swap-input-control-panel': {
            justifyContent: string;
            alignItems: string;
            '>.swap-available-value': {
                alignItems: string;
                fontWeight: string;
                '>p': {
                    color: string;
                    mr: number;
                };
                '>span': {
                    color: string;
                    mr: number;
                };
                '>.swap-available-value-skeleton': {
                    pr: number;
                    '>:first-of-type': {
                        w: number;
                        h: number;
                        borderRadius: string;
                    };
                };
            };
            '>button': {
                py: number;
                px: number;
                ml: number;
                w: string;
                h: string;
                bg: string;
                color: string;
            };
        };
    };
    '>.swap-control-panel-box': {
        w: string;
        '>.swap-control-dropdown-button': {
            flex: number;
            display: string;
            justifyContent: string;
            minW: string;
            w: string;
            h: number;
            '>:first-of-type': {
                w: number;
                h: number;
                mr: number;
                '>img': {
                    w: string;
                };
            };
            '>:last-child>:first-of-type': {
                display: string;
                alignItems: string;
                fontWeight: string;
                fontSize: string;
                lineHeight: string;
                mb: number;
                '>svg': {
                    ml: number;
                };
            };
            '>:last-child>:last-child': {
                textAlign: string;
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
                opacity: number;
            };
        };
        '>.swap-skeleton-dropdown-button': {
            flex: number;
            alignItems: string;
            '>:first-of-type': {
                w: number;
                h: number;
            };
            '>.swap-dropdown-control-panel-skeleton': {
                justifyContent: string;
                alignItems: string;
                '>:first-of-type': {
                    w: number;
                    h: number;
                    borderRadius: string;
                };
                '>:last-of-type': {
                    w: number;
                    h: number;
                    borderRadius: string;
                };
            };
        };
        '>.swap-input-panel': {
            flex: number;
            justifyContent: string;
            alignItems: string;
            overflow: string;
            '>.swap-editable-input-box': {
                w: string;
                textAlign: string;
                '>.swap-editable-input': {
                    fontSize: string;
                    w: string;
                    h: string;
                    p: number;
                    textAlign: string;
                    border: string;
                    borderRadius: string;
                    _focus: {
                        boxShadow: string;
                    };
                    _focusVisible: {
                        boxShadow: string;
                    };
                    _invalid: {
                        boxShadow: string;
                        color: string;
                    };
                };
                '>.swap-editable-text': {
                    overflow: string;
                    scrollbarWidth: string;
                    '::-webkit-scrollbar': {
                        display: string;
                    };
                    fontSize: string;
                    fontWeight: string;
                    lineHeight: string;
                    pb: number;
                    whiteSpace: string;
                };
                '>.swap-fiat-text': {
                    overflow: string;
                    scrollbarWidth: string;
                    '::-webkit-scrollbar': {
                        display: string;
                    };
                    color: string;
                    fontSize: string;
                    lineHeight: string;
                    whiteSpace: string;
                };
            };
            '>.swap-display-box': {
                w: string;
                textAlign: string;
                '>.swap-amount-text': {
                    overflow: string;
                    scrollbarWidth: string;
                    '::-webkit-scrollbar': {
                        display: string;
                    };
                    fontSize: string;
                    fontWeight: string;
                    lineHeight: string;
                    pb: number;
                    whiteSpace: string;
                };
                '>.swap-fiat-text': {
                    overflow: string;
                    whiteSpace: string;
                    scrollbarWidth: string;
                    '::-webkit-scrollbar': {
                        display: string;
                    };
                    color: string;
                    fontSize: string;
                    lineHeight: string;
                };
            };
        };
        '>.swap-skeleton-input-panel': {
            '>.swap-dropdown-control-panel-skeleton': {
                justifyContent: string;
                alignItems: string;
                '>:first-of-type': {
                    w: number;
                    h: number;
                    borderRadius: string;
                };
                '>:last-of-type': {
                    w: number;
                    h: number;
                    borderRadius: string;
                };
            };
        };
        '&.swap-control-panel-hidden': {
            visibility: string;
        };
    };
    '>.swap-dropdown-box': {
        w: string;
        mx: number;
        position: string;
        top: number;
        zIndex: number;
    };
};
export declare const SwapControlPanel: ({ inputLoading, dropdownLoading, dropdownData, selectedToken, swapType, inputControlPanel, inputAmount, inputDollarValue, invalid, invalidText, className, styleProps, onDropdownChange, onAmountInputChange }: SwapControlPanelType) => JSX.Element;
