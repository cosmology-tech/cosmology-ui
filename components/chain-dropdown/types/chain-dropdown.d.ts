/// <reference types="react" />
import { ChakraStylesConfig, DropdownIndicatorProps, GroupBase, LoadingIndicatorProps, OptionProps, PlaceholderProps } from 'chakra-react-select';
import { ChangeChainDropdownType, DataType } from './type';
export declare const SkeletonOptions: () => JSX.Element;
export declare const IndicatorSeparator: () => any;
export declare const LoadingIndicator: (props: LoadingIndicatorProps<DataType, false, GroupBase<DataType>>) => JSX.Element;
export declare const DropdownIndicator: (props: DropdownIndicatorProps<DataType, false, GroupBase<DataType>>) => JSX.Element;
export declare const Placeholder: (props: PlaceholderProps<DataType, false, GroupBase<DataType>>) => JSX.Element;
export declare const Option: (props: OptionProps<DataType, false, GroupBase<DataType>>) => JSX.Element;
export declare const ChangeChainDropdownBaseStyle: (theme: string) => ChakraStylesConfig<DataType, false, GroupBase<DataType>>;
export declare const ChainDropdown: ({ data, selectedItem, loading, disabled, styleProps, className, customComponents, onChange }: ChangeChainDropdownType) => JSX.Element;
