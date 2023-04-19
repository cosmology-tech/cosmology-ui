/// <reference types="react" />
import { ChakraStylesConfig, GroupBase, MenuListProps, OptionProps, PlaceholderProps } from 'chakra-react-select';
import { SwapControlDropdownButtonType, SwapDropdownType, SwapOptionDataType } from './type';
export declare const SwapDropdownMenuBaseShadowAnimate: (displayBlur: boolean) => {
    opacity: number;
    height: number;
    transition: {
        type: string;
        duration: number;
    };
};
export declare const SwapIndicatorSeparator: () => any;
export declare const SwapDropdownIndicator: () => any;
export declare const SwapDropdownMenuList: (props: MenuListProps<SwapOptionDataType, false, GroupBase<SwapOptionDataType>>) => JSX.Element;
export declare const SwapPlaceholder: (props: PlaceholderProps<SwapOptionDataType, false, GroupBase<SwapOptionDataType>>) => JSX.Element;
export declare const SwapOption: (props: OptionProps<SwapOptionDataType, false, GroupBase<SwapOptionDataType>>) => JSX.Element;
export declare const SwapDropdownBaseStyle: (theme: string) => ChakraStylesConfig<SwapOptionDataType, false, GroupBase<SwapOptionDataType>>;
export declare const SwapDropdown: ({ isOpen, dropdownData, selectedToken, onClose, onDropdownChange }: SwapDropdownType) => JSX.Element;
export declare const SwapControlDropdownButton: ({ loading, selectedToken, onOpen }: SwapControlDropdownButtonType) => JSX.Element;
