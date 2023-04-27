/// <reference types="react" />
import { SwapControlInputValuePanelType, SwapEditableInputType } from './type';
export declare const SwapEditableInput: ({ id, initialAmount, inputAmount, inputDollarValue, invalidText, onAmountInputChange }: SwapEditableInputType) => JSX.Element;
export declare const SwapInputControlPanel: ({ loading, amount, onAmountInputChange }: SwapControlInputValuePanelType) => JSX.Element;
