import { ActionMeta, OnChangeValue, OptionBase } from 'chakra-react-select';

/* ====================================================== */
/*                      Display Type                      */
/* ====================================================== */
export enum SwapType {
  FROM = 'from',
  TO = 'to'
}
export enum SwapInputType {
  INPUT = 'input',
  INVALID = 'invalid'
}

/* ====================================================== */
/*                        Function                        */
/* ====================================================== */
export type handleSwapDropdown = (
  newValue: OnChangeValue<SwapOptionType, false>,
  actionMeta: ActionMeta<SwapOptionType>
) => void;
export type handleSwapInput = (newValue: string) => void;
export type SwapSwitchButtonType = {
  onSwapSwitch: () => void;
};

/* ====================================================== */
/*                       Components                       */
/* ====================================================== */
export type SwapControlDropdownButtonType = {
  loading: boolean;
  /**
   * The selected item.
   * @see {@link SwapOptionType}
   */
  selectedToken?: SwapOptionType;
  /**
   * The function to open dropdown.
   */
  onOpen: () => void;
};
export interface SwapOptionType extends OptionBase {
  /**
   * Required, use for display selected option.
   * Equal to denom.
   * The unique identifier for option.
   */
  value: string;
  symbol: string;
  chainName: string;
  icon?: {
    png?: string;
    jpeg?: string;
    svg?: string;
  };
  displayAmount: string;
  dollarValue: string;
  /**
   * Not displayed.
   * Use for data calculation.
   */
  denom: string;
  amount: string;
}
export type SwapDropdownType = {
  /**
   * Display dropdown or not.
   */
  isOpen: boolean;
  /**
   * Data of options.
   * @see {@link SwapOptionType}
   */
  dropdownData: SwapOptionType[];
  /**
   * Selected item.
   * @see {@link SwapOptionType}
   */
  selectedToken?: SwapOptionType;
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

export type SwapControlInputValuePanelType = {
  loading: boolean;
  amount?: string;
  onAmountInputChange: handleSwapInput;
};
export type SwapEditableInputType = {
  id: string;
  inputAmount: string;
  inputDollarValue: string;
  initialAmount: string;
  invalidText?: string;
  onAmountInputChange: handleSwapInput;
};
export type SwapTokenType = {
  [k in SwapType]: {
    amount: string;
    dollar: string;
  };
};
export interface SwapInputDataType extends SwapTokenType {
  invalidText?: string;
}

export interface SwapPriceType {
  priceRate: string;
  dollarValue: string;
}
export type SwapPriceDetailCoin = {
  logoUrl:
    | {
        png?: string;
        jpeg?: string;
        svg?: string;
      }
    | undefined;
  symbol: string;
};
export type SwapPriceDetailRoute = {
  poolId: string;
  swapFee: string;
  baseLogo:
    | {
        png?: string;
        jpeg?: string;
        svg?: string;
      }
    | undefined;
  baseSymbol: string;
  quoteLogo:
    | {
        png?: string;
        jpeg?: string;
        svg?: string;
      }
    | undefined;
  quoteSymbol: string;
};
export type SwapPriceDetailRouteDetail = {
  tokenIn: SwapPriceDetailCoin;
  routes: SwapPriceDetailRoute[];
  tokenOut: SwapPriceDetailCoin;
};
export type SwapDetailsType = {
  priceImpact?: string;
  swapFee?: {
    percentage: string;
    value: string;
  };
  expectedOutput?: string;
  minimumReceived?: string;
  route?: SwapPriceDetailRouteDetail;
};
export interface SwapDetailsProps extends SwapDetailsType {
  tokenOutSymbol: string;
}

export type SwapToggleSlippagesListButtonType = {
  slippagesListOpen: boolean;
  toggleOpenSlippagesList: () => void;
};
export type SwapSlippageButtonType = {
  label: string;
  selectedSlippage: string;
  setSelectedSlippage: (value: string) => void;
  onCloseSettingList: () => void;
};
export type SwapSlippageConfig = {
  slippages: string[];
  selectedSlippage: string;
  setSelectedSlippage: (value: string) => void;
};

export interface SwapControlPanelType {
  /**
   * Display loading skeleton.
   */
  loading: boolean;
  /**
   * Required. Display `From` or `To` panel.
   * @see {@link SwapType}
   */
  swapType: SwapType;
  /**
   * Selected options.
   * @see {@link SwapOptionType}
   */
  selectedToken?: SwapOptionType;
  /**
   * Config to from token input.
   * @see {@link SwapInputDataType}
   */
  inputData: SwapInputDataType;
  /**
   * Config to token dropdown.
   * @see {@link SwapOptionType}
   */
  dropdownData: SwapOptionType[];
  /**
   * A function called to handle dropdown change.
   * @see {@link handleSwapDropdown}
   */
  onDropdownChange: handleSwapDropdown;
  /**
   * A function called to handle amount input change.
   * @see {@link handleSwapInput}
   */
  onAmountInputChange?: handleSwapInput;
}
export interface SwapDropdownsViewType {
  /**
   * Display loading skeleton.
   */
  loading: boolean;
  /**
   * The selected token of the `from` panel.
   */
  fromToken?: SwapOptionType;
  /**
   * The selected token of the `to` panel.
   */
  toToken?: SwapOptionType;
  /**
   * Config to `from` and `to` input panel.
   */
  inputData: SwapInputDataType;
  /**
   * Config to dropdown options.
   */
  dropdownData: SwapOptionType[];
  /**
   * A function called to handle dropdown change.
   * @see {@link handleSwapDropdown}
   */
  onFromDropdownChange: handleSwapDropdown;
  /**
   * A function called to handle dropdown change.
   * @see {@link handleSwapDropdown}
   */
  onToDropdownChange: handleSwapDropdown;
  /**
   * A function called to handle amount input change.
   * @see {@link handleSwapInput}
   */
  onAmountInputChange?: handleSwapInput;
  /**
   *  A function called to handle switch dropdowns.
   */
  onSwapSwitch: () => void;
}
export interface SwapPriceAndDetailsType {
  loading: boolean;
  price: SwapPriceType;
  tokenInSymbol?: string;
  tokenOutSymbol?: string;
  swapDetails?: SwapDetailsType;
}

/* ====================================================== */
/*                  Composite Components                  */
/* ====================================================== */
export interface SwapViewType extends SwapDropdownsViewType {
  /**
   * An object of the current price exchange rate.
   * @see {@link SwapPriceType}
   */
  tokenPrice: SwapPriceType;
  /**
   * An object of the swap details.
   * @see {@link SwapDetailsType}
   */
  swapDetails?: SwapDetailsType;
  /**
   * Config to slippage object.
   */
  slippageConfig: SwapSlippageConfig;
  /**
   * Submit button status.
   */
  submitButtonConfig: {
    /**
     * Submit button display text.
     */
    btnText?: string;
    /**
     * Submit button display loading.
     */
    loading?: boolean;
    /**
     * Submit button display disabled.
     */
    disabled?: boolean;
  };
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
