import { ActionMeta, OnChangeValue, OptionBase } from 'chakra-react-select';

/**
 * Swap display `From` or `To`.
 */
export enum SwapType {
  from = 'from',
  to = 'to'
}

export enum SwapInputType {
  INPUT = 'INPUT',
  INVALID = 'INVALID'
}

export interface SwapOptionDataType extends OptionBase {
  /**
   * Required. Unique identifier for option, also the display chain name.
   */
  value: string;
  /**
   * Display symbol name.
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
  balanceDisplayAmount: string;
  /**
   * Amount denominated in fiat currency.
   */
  dollarValue: string;
}

export interface SwapTokenType extends SwapOptionDataType {
  /**
   * Current balance of this chain.
   */
  currentDisplayAmount: string;
  /**
   * Amount denominated in fiat currency.
   */
  currentDollarValue: string;
}

export type handleSwapDropdown = (
  newValue: OnChangeValue<SwapOptionDataType, false>,
  actionMeta: ActionMeta<SwapOptionDataType>
) => void;

export type handleSwapInput = (newValue: string) => void;

export type SwapDropdownType = {
  /**
   * Display dropdown or not.
   */
  isOpen: boolean;
  /**
   * Data of options.
   * @see {@link SwapOptionDataType}
   */
  dropdownData: SwapOptionDataType[];
  /**
   * Selected item.
   * @see {@link SwapOptionDataType}
   */
  selectedToken?: SwapOptionDataType;
  /**
   * Close dropdown when selected token.
   */
  onClose: () => void;
  /**
   * A function called to handle select item.
   * @see {@link handleSwapDropdown}
   */
  onDropdownChange: handleSwapDropdown;
};

export type SwapControlDropdownButtonType = {
  loading: boolean;
  /**
   * The selected item.
   * @see {@link SwapTokenType}
   */
  selectedToken: SwapTokenType;
  /**
   * The function to open dropdown.
   */
  onOpen: () => void;
};

export type SwapControlInputValuePanelType = {
  displayPanel: boolean;
  loading: boolean;
  amount?: string;
  onAmountInputChange: handleSwapInput;
};

export type SwapEditableInputType = {
  id: string;
  inputAmount: string;
  inputDollarValue: string;
  selectedToken?: SwapOptionDataType;
  invalid?: boolean;
  invalidText?: string;
  onAmountInputChange: handleSwapInput;
};

export type SwapDisplayAmountType = {
  id: string;
  selectedToken?: SwapOptionDataType;
};

export interface SwapInputConfig {
  /**
   * Display input loading skeleton.
   */
  inputLoading: boolean;
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
}

export type SwapDropdownConfig = {
  /**
   * Display dropdown loading skeleton.
   */
  dropdownLoading: boolean;
  /**
   * Data of dropdown options.
   */
  dropdownData?: SwapOptionDataType[];
};

export type SwapControlPanelType = {
  /**
   * Required. Display `From` or `To` panel.
   * @see {@link SwapType}
   */
  swapType: SwapType;
  /**
   * Selected options.
   * @see {@link SwapTokenType}
   */
  selectedToken?: SwapTokenType;
  /**
   * Config to from token input.
   * @see {@link SwapInputConfig}
   */
  inputConfig: SwapInputConfig;
  /**
   * Config to token dropdown.
   * @see {@link SwapDropdownConfig}
   */
  dropdownConfig: SwapDropdownConfig;
  /**
   *  A function called to handle dropdown change.
   * @see {@link handleSwapDropdown}
   */
  onDropdownChange: handleSwapDropdown;
  /**
   *  A function called to handle amount input change.
   * @see {@link handleSwapInput}
   */
  onAmountInputChange?: handleSwapInput;
};

export type SwapSettingType = {
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
   * A function called to handle select item.
   *
   * see `handleSwapDropdown` :
   */
  onSelectSetting: (value: string) => void;
};

export type SwapSettingControlButtonType = {
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
  dropdownData: SwapOptionDataType[];
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
  fromToken?: SwapOptionDataType;
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
  toToken?: SwapOptionDataType;
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
  onAmountInputChange: handleSwapInput;
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

export type SwapSwitchButtonType = {
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
   * Can add a stable class name to control CSS.
   * @default 'swap-view'
   */
  className?: string;
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
