import { ActionMeta, OnChangeValue, OptionBase } from 'chakra-react-select';
export declare enum SwapType {
    from = "From",
    to = "To"
}
export declare enum SwapInputType {
    INPUT = "INPUT",
    INVALID = "INVALID"
}
export interface SwapDataType extends OptionBase {
    /**
     * Chain name.
     * Unique identifier for option.
     */
    value: string;
    /**
     * Chain symbol name.
     */
    symbol: string;
    /**
     * Icon display for option.
     */
    icon?: {
        png?: string;
        jpeg?: string;
        svg?: string;
    };
    /**
     * Unit of the chain.
     */
    denom?: string;
    /**
     * Current balance of this chain.
     */
    amount: string;
    /**
     * Amount denominated in fiat currency.
     */
    dollarValue: string;
    /**
     * Current balance of this chain.
     */
    currentAmount: string;
    /**
     * Amount denominated in fiat currency.
     */
    currentDollarValue: string;
    /**
     * Disabled the option.
     */
    disabled?: boolean;
}
export declare type handleSwapDropdown = (newValue: OnChangeValue<SwapDataType, false>, actionMeta: ActionMeta<SwapDataType>) => void;
export declare type SwapDropdownType = {
    /**
     * Display dropdown or not.
     */
    isOpen: boolean;
    /**
     * Display loading status.
     */
    loading?: boolean;
    /**
     * Data of options.
     *
     * see `SwapDataType` :
     */
    dropdownData: SwapDataType[];
    /**
     * Selected item.
     *
     * see `SwapDataType` :
     */
    selectedToken?: SwapDataType;
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom dropdown style.
     *
     * Also can use css control, e.g,
     * ```
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * ```
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     *
     * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
     */
    styleProps?: object;
    /**
     * Can use Framer Motion Props control animation.
     *
     * see framer-motion docs: https://www.framer.com/docs/
     */
    shadowAnimateProps?: object;
    /**
     * Can custom dropdown, default:
     * ```
     *  {
     *    DropdownIndicator,
     *    IndicatorSeparator,
     *    LoadingIndicator,
     *    Placeholder,
     *    Option
     *  }
     * ```
     */
    customComponents?: object;
    /**
     * Close dropdown when selected token.
     */
    onClose: () => void;
    /**
     * A function called to handle select item.
     *
     * see `handleSwapDropdown` :
     */
    onDropdownChange: handleSwapDropdown;
};
export declare type SwapControlDropdownButtonType = {
    selectedToken: SwapDataType;
    onOpen: () => void;
};
export declare type SwapControlInputValuePanelType = {
    loading: boolean;
    amount?: string;
    onAmountInputChange: (newValue: string) => void;
};
export declare type SwapEditableInputType = {
    id: string;
    inputAmount: string;
    inputDollarValue: string;
    selectedToken?: SwapDataType;
    invalid?: boolean;
    invalidText?: string;
    onAmountInputChange: (newValue: string) => void;
};
export declare type SwapDisplayAmountType = {
    id: string;
    selectedToken?: SwapDataType;
};
export declare type SwapControlPanelType = {
    /**
     * Display input loading skeleton.
     */
    inputLoading?: boolean;
    /**
     * Display dropdown loading skeleton.
     */
    dropdownLoading?: boolean;
    /**
     * Data of dropdown options.
     */
    dropdownData?: SwapDataType[];
    /**
     * Selected options.
     */
    selectedToken?: SwapDataType;
    /**
     * Display `from` or `To` panel.
     */
    swapType?: SwapType;
    /**
     * Display control input panel.
     */
    inputControlPanel?: boolean;
    /**
     * Amount of the token.
     */
    inputAmount?: string;
    /**
     * Equal to the fiat currency value.
     */
    inputDollarValue?: string;
    /**
     * Display input invalid style.
     */
    invalid?: boolean;
    /**
     * Tips text of why invalid.
     */
    invalidText?: string;
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom dropdown style.
     *
     * Also can use css control, e.g,
     * ```
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * ```
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     *
     * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
     */
    styleProps?: object;
    /**
     *  A function called to handle amount input change.
     */
    onAmountInputChange?: (newValue: string) => void;
    /**
     *  A function called to handle dropdown change.
     */
    onDropdownChange: handleSwapDropdown;
};
export declare type SwapSettingType = {
    /**
     * Selected setting token.
     */
    settingToken?: string;
    /**
     * Display setting token list.
     */
    tokenArray?: string[];
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom dropdown style.
     *
     * Also can use css control, e.g,
     * ```
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * ```
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     *
     * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
     */
    styleProps?: object;
    /**
     * A function called to handle select item.
     *
     * see `handleSwapDropdown` :
     */
    onSelectSetting: (value: string) => void;
};
export declare type SwapSettingControlButtonType = {
    settingMenuOpen: boolean;
    toggleOpenSettingMenu: () => void;
};
export interface SwapSettingTokenButtonType {
    selectedToken?: string;
    text: string;
    onSettingTokenClick: (value: string) => void;
    onCloseSettingMenu: () => void;
}
export interface SwapDropdownsViewType {
    /**
     * Data of dropdown options.
     */
    dropdownData: SwapDataType[];
    /**
     * Display dropdown loading skeleton.
     */
    fromDropdownLoading?: boolean;
    /**
     * Display input loading skeleton.
     */
    fromInputLoading?: boolean;
    /**
     * Swap from this token.
     */
    fromToken?: SwapDataType;
    /**
     * Display dropdown loading skeleton.
     */
    toDropdownLoading?: boolean;
    /**
     * Display input loading skeleton.
     */
    toInputLoading?: boolean;
    /**
     * Swap to this token.
     */
    toToken?: SwapDataType;
    /**
     * Amount of the token.
     */
    inputAmount?: string;
    /**
     * Equal to the fiat currency value.
     */
    inputDollarValue?: string;
    /**
     * Display input invalid style.
     */
    invalid?: boolean;
    /**
     * Tips text of why invalid.
     */
    invalidText?: string;
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom dropdown style.
     *
     * Also can use css control, e.g,
     * ```
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * ```
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     *
     * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
     */
    styleProps?: object;
    /**
     *  A function called to handle to amount input change.
     */
    onAmountInputChange: (newValue: string) => void;
    /**
     *  A function called to handle from dropdown change.
     */
    onFromDropdownChange: handleSwapDropdown;
    /**
     *  A function called to handle to dropdown change.
     */
    onToDropdownChange: handleSwapDropdown;
    /**
     *  A function called to handle switch dropdowns.
     */
    onSwapSwitch: () => void;
}
export declare type SwapSwitchButtonType = {
    onSwapSwitch: () => void;
};
export interface SwapViewType extends SwapDropdownsViewType {
    /**
     * Selected setting token.
     */
    settingToken?: string;
    /**
     * Display setting token list.
     */
    tokenArray?: string[];
    /**
     * An object of the current price exchange rate.
     */
    priceValue?: {
        loading: boolean;
        rate: {
            fromValue: string;
            toValue: string;
            dollarValue: string;
        };
    };
    /**
     * Submit button display loading.
     */
    submitLoading?: boolean;
    /**
     * Submit button display disabled.
     */
    submitDisabled?: boolean;
    /**
     * A function called to control setting.
     */
    onSelectSetting: (value: string) => void;
    /**
     * A function called to control submit.
     */
    onSwapSubmit: () => void;
}
export interface SwapModalType extends SwapViewType {
    /**
     * If `true`, the modal will be open.
     */
    isOpen: boolean;
    /**
     * A function called to close modal.
     */
    onClose: () => void;
}
