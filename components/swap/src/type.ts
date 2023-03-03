import { ActionMeta, OnChangeValue, OptionBase } from 'chakra-react-select';

export enum SwapType {
  from = 'From',
  to = 'To'
}

export enum SwapInputType {
  INPUT = 'INPUT',
  INVALID = 'INVALID'
}

export interface SwapDataType extends OptionBase {
  /**
   * Unique identifier for option.
   */
  name: string;
  /**
   * Text to display for option.
   */
  label: string;
  /**
   * Value of option.
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
   * Current balance of this chain.
   */
  amountValue: string;
  /**
   * Amount denominated in fiat currency.
   */
  fiatValue: string;
  /**
   * Disabled the option.
   */
  disabled?: boolean;
}

export type handleSwapDropdown = (
  newValue: OnChangeValue<SwapDataType, false>,
  actionMeta: ActionMeta<SwapDataType>
) => void;

export type SwapDropdownType = {
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

export type SwapControlDropdownButtonType = {
  selectedToken: SwapDataType;
  onOpen: () => void;
};

export type SwapControlInputValuePanelType = {
  loading: boolean;
  amountValue?: string;
  onAmountInputChange: (newValue: string) => void;
};

export type SwapEditableInputType = {
  id: string;
  amountValue: string;
  fiatValue: string;
  selectedToken?: SwapDataType;
  invalid?: boolean;
  invalidText?: string;
  onAmountInputChange: (newValue: string) => void;
};

export type SwapDisplayAmountType = {
  id: string;
  selectedToken?: SwapDataType;
};

export type SwapControlPanelType = {
  inputLoading?: boolean;
  dropdownLoading?: boolean;
  dropdownData?: SwapDataType[];
  selectedToken?: SwapDataType;
  swapType?: SwapType;
  inputControlPanel?: boolean;
  amountValue?: string;
  fiatValue?: string;
  invalid?: boolean;
  invalidText?: string;
  className?: string;
  styleProps?: object;
  onAmountInputChange?: (newValue: string) => void;
  onDropdownChange: handleSwapDropdown;
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
  dropdownData: SwapDataType[];
  fromDropdownLoading?: boolean;
  fromInputLoading?: boolean;
  fromToken?: SwapDataType;
  toDropdownLoading?: boolean;
  toInputLoading?: boolean;
  toToken?: SwapDataType;
  amountValue?: string;
  fiatValue?: string;
  invalid?: boolean;
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
  onAmountInputChange: (newValue: string) => void;
  onFromDropdownChange: handleSwapDropdown;
  onToDropdownChange: handleSwapDropdown;
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
  priceValue?: {
    loading: boolean;
    amountValue: string;
    fiatValue: string;
  };
  submitDisabled?: boolean;
  onSelectSetting: (value: string) => void;
  onSwapSubmit: () => void;
}
export interface SwapModalType extends SwapViewType {
  isOpen: boolean;
  onClose: () => void;
}
