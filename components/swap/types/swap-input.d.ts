/// <reference types="react" />
import { SwapControlInputValuePanelType, SwapEditableInputType } from './type';
export declare const SwapEditableInput: ({ id, selectedToken, inputAmount, inputDollarValue, invalid, invalidText, onAmountInputChange }: SwapEditableInputType) => JSX.Element;
export declare const SwapInputControlPanel: ({ loading, amount, onAmountInputChange }: SwapControlInputValuePanelType) => JSX.Element;
