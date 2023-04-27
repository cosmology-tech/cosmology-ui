/// <reference types="react" />
import { SwapViewType } from './type';
export declare const SwapViewBaseStyle: (theme: string) => {
    '>.swap-divider': {
        borderColor: string;
    };
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
        '>.swap-slippage': {
            w: string;
            position: string;
            '>.swap-slippage-list-box': {
                position: string;
                right: number;
                transition: string;
                visibility: string;
                opacity: number;
                '&.swap-slippage-list': {
                    visibility: string;
                    opacity: number;
                    right: number;
                };
                '>.swap-slippage-button': {
                    h: number;
                    minW: number;
                    mr: number;
                    px: number;
                    display: string;
                    justifyContent: string;
                    borderRadius: string;
                    bg: string;
                    color: string;
                    _hover: {
                        bg: string;
                    };
                    '&.swap-slippage-selected': {
                        bg: string;
                        color: string;
                        _hover: {
                            bg: string;
                            color: string;
                        };
                    };
                };
            };
            '>.swap-toggle-button': {
                h: number;
                w: number;
                minW: string;
                display: string;
                justifyContent: string;
                borderRadius: string;
                bg: string;
                color: string;
            };
        };
    };
    '>.swap-price-box': {
        '>.swap-price': {
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
                '>.swap-toggle-button': {
                    h: number;
                    w: number;
                    ml: number;
                    minW: string;
                    borderRadius: string;
                    bg: string;
                    color: string;
                    '&.swap-detail-button-open': {
                        bg: string;
                        color: string;
                    };
                };
            };
        };
        '>.swap-detail-animate': {
            '>.swap-price-detail-box': {
                mt: number;
                my: number;
                fontSize: string;
                color: string;
                '>.swap-price-detail': {
                    display: string;
                    justifyContent: string;
                    alignItems: string;
                    '>.swap-price-value': {
                        fontWeight: string;
                        textAlign: string;
                        ml: number;
                    };
                    '&.swap-price-impact': {
                        mb: number;
                    };
                    '&.swap-fee': {
                        mb: number;
                    };
                    '&.swap-expected-output': {
                        mb: number;
                    };
                    '&.swap-minimum-received': {
                        mb: number;
                    };
                    '&.swap-route': {
                        display: string;
                        '>.swap-route-title': {
                            mb: number;
                        };
                        '>.swap-route-details': {
                            alignItems: string;
                            color: string;
                            '>.swap-route-sellToken': {
                                mr: number;
                                '&.swap-route-icon': {
                                    w: number;
                                    h: number;
                                    minW: number;
                                    minH: number;
                                    maxW: number;
                                    maxH: number;
                                };
                            };
                            '>.swap-route-divider-box': {
                                w: string;
                                mr: number;
                                '>.swap-route-divider': {
                                    border: string;
                                    borderColor: string;
                                };
                            };
                            '>.swap-route-pool-box': {
                                alignItems: string;
                                justifyContent: string;
                                position: string;
                                minW: number;
                                h: number;
                                '>.swap-route-icon': {
                                    position: string;
                                    w: number;
                                    h: number;
                                    minW: number;
                                    minH: number;
                                    maxW: number;
                                    maxH: number;
                                    '&.swap-route-icon-left': {
                                        left: number;
                                        zIndex: number;
                                    };
                                    '&.swap-route-icon-right': {
                                        right: number;
                                        zIndex: number;
                                    };
                                };
                            };
                            '>.swap-route-fee': {
                                ml: number;
                                mr: number;
                                fontWeight: string;
                            };
                            '>.swap-route-buyToken': {
                                '&.swap-route-icon': {
                                    w: number;
                                    h: number;
                                    minW: number;
                                    minH: number;
                                    maxW: number;
                                    maxH: number;
                                };
                            };
                        };
                    };
                };
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
export declare const SwapView: ({ loading, fromToken, toToken, inputData, dropdownData, tokenPrice, swapDetails, slippageConfig, submitButtonConfig, onAmountInputChange, onFromDropdownChange, onToDropdownChange, onSwapSwitch, onSwapSubmit }: SwapViewType) => JSX.Element;
