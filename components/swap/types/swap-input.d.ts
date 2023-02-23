/// <reference types="react" />
import { SwapControlInputValuePanelType, SwapEditableInputType } from './type';
export declare const SwapEditableInput: ({ id, selectedToken, fiatValue, amountValue, invalid, invalidText, onAmountInputChange }: SwapEditableInputType) => JSX.Element;
export declare const SwapInputControlPanel: ({ loading, amountValue, onAmountInputChange }: SwapControlInputValuePanelType) => JSX.Element;
