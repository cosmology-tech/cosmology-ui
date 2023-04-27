/// <reference types="react" />
import { ChakraStylesConfig, GroupBase, MenuListProps, OptionProps, PlaceholderProps } from 'chakra-react-select';
import { SwapControlDropdownButtonType, SwapDropdownType, SwapOptionType } from './type';
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
export declare const SwapDropdownMenuList: (props: MenuListProps<SwapOptionType, false, GroupBase<SwapOptionType>>) => JSX.Element;
export declare const SwapPlaceholder: (props: PlaceholderProps<SwapOptionType, false, GroupBase<SwapOptionType>>) => JSX.Element;
export declare const SwapOption: (props: OptionProps<SwapOptionType, false, GroupBase<SwapOptionType>>) => JSX.Element;
export declare const SwapDropdownBaseStyle: (theme: string) => ChakraStylesConfig<SwapOptionType, false, GroupBase<SwapOptionType>>;
export declare const SwapDropdown: ({ isOpen, dropdownData, selectedToken, onClose, onDropdownChange }: SwapDropdownType) => JSX.Element;
export declare const SwapControlDropdownButton: ({ loading, selectedToken, onOpen }: SwapControlDropdownButtonType) => JSX.Element;
