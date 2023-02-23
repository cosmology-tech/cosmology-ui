/// <reference types="react" />
import { ChakraStylesConfig, GroupBase, MenuListProps, OptionProps, PlaceholderProps } from 'chakra-react-select';
import { SwapControlDropdownButtonType, SwapDataType, SwapDropdownType } from './type';
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
export declare const SwapDropdownMenuList: (props: MenuListProps<SwapDataType, false, GroupBase<SwapDataType>>) => JSX.Element;
export declare const SwapPlaceholder: (props: PlaceholderProps<SwapDataType, false, GroupBase<SwapDataType>>) => JSX.Element;
export declare const SwapOption: (props: OptionProps<SwapDataType, false, GroupBase<SwapDataType>>) => JSX.Element;
export declare const SwapDropdownBaseStyle: (theme: string) => ChakraStylesConfig<SwapDataType, false, GroupBase<SwapDataType>>;
export declare const SwapDropdown: ({ isOpen, loading, dropdownData, selectedToken, className, styleProps, customComponents, onClose, onDropdownChange }: SwapDropdownType) => JSX.Element;
export declare const SwapControlDropdownButton: ({ selectedToken, onOpen }: SwapControlDropdownButtonType) => JSX.Element;
