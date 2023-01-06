import {
  Box,
  Center,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import {
  AsyncSelect,
  chakraComponents,
  ChakraStylesConfig,
  DropdownIndicatorProps,
  GroupBase,
  LoadingIndicatorProps,
  OptionProps,
  PlaceholderProps
} from 'chakra-react-select';
import { Searcher } from 'fast-fuzzy';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { ChangeChainDropdownType, DataType } from '../../index';

export const SkeletonOptions = () => {
  return (
    <Stack isInline={true} alignItems="center" spacing={3}>
      <SkeletonCircle w={10} h={10} />
      <Skeleton w={40} h={6} />
    </Stack>
  );
};

export const IndicatorSeparator = () => {
  return null;
};

export const LoadingIndicator = (
  props: LoadingIndicatorProps<DataType, false, GroupBase<DataType>>
) => {
  return (
    <chakraComponents.LoadingIndicator
      emptyColor="transparent"
      speed="0.45s"
      thickness="2px"
      {...props}
    />
  );
};

export const DropdownIndicator = (
  props: DropdownIndicatorProps<DataType, false, GroupBase<DataType>>
) => {
  return (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={FiChevronDown} />
    </chakraComponents.DropdownIndicator>
  );
};

export const Placeholder = (
  props: PlaceholderProps<DataType, false, GroupBase<DataType>>
) => {
  if (props.hasValue) {
    return (
      <chakraComponents.Placeholder {...props}>
        <Stack
          id={props.getValue()[0].name}
          isInline={true}
          alignItems="center"
          spacing={2}
          overflow="hidden"
          wordBreak="break-word"
          w="full"
        >
          <Center
            minW={8}
            minH={8}
            maxW={8}
            maxH={8}
            w={8}
            h={8}
            border="1px solid"
            borderColor="inherit"
            borderRadius="full"
            overflow="hidden"
          >
            <Center m="1px" overflow="hidden" borderRadius="full">
              <Image
                src={
                  props.getValue()[0].icon?.png ||
                  props.getValue()[0].icon?.jpeg ||
                  props.getValue()[0].icon?.svg
                }
                fallbackSrc={`https://dummyimage.com/150/9e9e9e/ffffff&text=${props
                  .getValue()[0]
                  .label.slice(0, 1)}`}
                alt={props.getValue()[0].name}
              />
            </Center>
          </Center>
          <Text opacity={0.85}>{props.getValue()[0].label}</Text>
        </Stack>
      </chakraComponents.Placeholder>
    );
  }
  return <chakraComponents.Placeholder {...props} />;
};

export const CustomOption = (
  props: OptionProps<DataType, false, GroupBase<DataType>>
) => {
  return (
    <chakraComponents.Option {...props}>
      <Stack
        id={props.label}
        isInline={true}
        alignItems="center"
        spacing={2}
        overflow="hidden"
        wordBreak="break-word"
        borderColor="inherit"
        w="full"
      >
        <Center
          minW={8}
          minH={8}
          maxW={8}
          maxH={8}
          w={8}
          h={8}
          border="1px solid"
          borderColor="inherit"
          borderRadius="full"
          overflow="hidden"
        >
          <Center m="1px" overflow="hidden" borderRadius="full">
            <Image
              alt={props.data.name}
              src={
                props.data.icon?.png ||
                props.data.icon?.jpeg ||
                props.data.icon?.svg
              }
              fallbackSrc={`https://dummyimage.com/400/9e9e9e/ffffff&text=${props.data.label.slice(
                0,
                1
              )}`}
            />
          </Center>
        </Center>
        <Text fontSize="md" fontWeight="medium" opacity={0.8}>
          {props.data.label}
        </Text>
      </Stack>
    </chakraComponents.Option>
  );
};

export const ChangeChainDropdownBaseStyle = (theme: string) => {
  const menuHeight = useBreakpointValue({ base: 60, md: 56 });
  const chakraStyle: ChakraStylesConfig<
    DataType,
    false,
    GroupBase<DataType>
  > = {
    control: (provided) => ({
      ...provided,
      minH: 8,
      height: 12,
      lineHeight: 1,
      borderRadius: 'lg',
      _focus: {
        borderColor: 'transparent',
        boxShadow: `change-chain-dropdown-shadow-${theme}`
      }
    }),
    menu: (provided) => ({
      ...provided,
      h: menuHeight,
      mt: 2,
      mb: 2,
      overflow: 'hidden',
      bg: `change-chain-dropdown-menu-background-color-${theme}`,
      boxShadow: `change-chain-dropdown-menu-shadow-${theme}`,
      borderRadius: 'base'
    }),
    menuList: (provided) => ({
      ...provided,
      h: menuHeight,
      bg: 'inherit',
      border: 'none',
      borderRadius: 'none',
      pl: 2,
      pr: 0.5,
      // For Firefox
      scrollbarWidth: 'thin',
      scrollbarColor: `var(--chakra-colors-change-chain-dropdown-firefox-scrollbar-color-${theme})`,
      // For Chrome and other browsers except Firefox
      '&::-webkit-scrollbar': {
        width: '8px',
        background: `change-chain-dropdown-scrollbar-background-color-${theme}`,
        borderRadius: '3px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: `change-chain-dropdown-scrollbar-thumb-color-${theme}`,
        borderRadius: '10px',
        border: '2px solid transparent', // make it like padding
        backgroundClip: 'content-box'
      }
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: 'md',
      fontWeight: 'medium',
      color: state.hasValue
        ? `change-chain-dropdown-placeholder-selected-text-color-${theme}`
        : `change-chain-dropdown-placeholder-text-color-${theme}`,
      borderColor: `change-chain-dropdown-icon-border-color-${theme}`
    }),
    clearIndicator: (provided) => ({
      ...provided,
      borderRadius: 'full',
      color: `change-chain-dropdown-indicator-text-color-${theme}`,
      w: 6,
      h: 6,
      '>svg': {
        w: 2.5,
        h: 2.5
      }
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: `change-chain-dropdown-loading-indicator-color-${theme}`
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      bg: `change-chain-dropdown-indicator-background-color-${theme}`,
      color: `change-chain-dropdown-indicator-text-color-${theme}`,
      pl: 0.5
    }),
    option: (provided, { isSelected }) => {
      return {
        ...provided,
        display: 'flex',
        borderRadius: 'lg',
        minH: 8,
        h: 'auto',
        p: '0.4rem 0.5rem',
        bg: isSelected
          ? `change-chain-dropdown-option-selected-background-color-${theme}`
          : `change-chain-dropdown-option-background-color-${theme}`,
        color: `change-chain-dropdown-text-color-${theme}`,
        borderColor: isSelected
          ? `change-chain-dropdown-icon-border-color-${theme}`
          : `change-chain-dropdown-icon-border-color-${theme}`,
        _hover: {
          bg: isSelected
            ? `change-chain-dropdown-option-selected-background-color-${theme}`
            : `change-chain-dropdown-option-hover-background-color-${theme}`
        },
        _active: {
          bg: `change-chain-dropdown-option-active-background-color-${theme}`
        },
        _focus: {
          bg: `change-chain-dropdown-option-focus-background-color-${theme}`
        },
        _disabled: {
          bg: `change-chain-dropdown-option-disabled-background-color-${theme}`,
          _hover: {
            bg: `change-chain-dropdown-option-disabled-background-color-${theme}`
          }
        },
        _notFirst: {
          mt: 1
        }
      };
    }
  };
  return chakraStyle;
};

export const ChangeChainDropdown = ({
  data,
  selectedItem,
  loading,
  disabled,
  theme = 'light',
  styleProps = ChangeChainDropdownBaseStyle(theme),
  className = 'dropdown',
  onChange
}: ChangeChainDropdownType) => {
  return (
    <Box w="full" h="full" position="relative" zIndex={150}>
      <AsyncSelect
        id="select-chain"
        instanceId="select-chain"
        className={className}
        placeholder="Choose a chain"
        chakraStyles={styleProps}
        isDisabled={disabled}
        isLoading={loading}
        isClearable={true}
        isMulti={false}
        isOptionDisabled={(option) =>
          option.disabled ? option.disabled : false
        }
        blurInputOnSelect={true}
        controlShouldRenderValue={false}
        loadingMessage={() => <SkeletonOptions />}
        value={selectedItem}
        defaultOptions={data}
        menuPlacement="auto"
        loadOptions={(inputValue, callback) => {
          const searcher = new Searcher(data, {
            keySelector: (obj) => obj.label
          });
          callback(searcher.search(inputValue));
        }}
        onChange={onChange}
        components={{
          DropdownIndicator,
          IndicatorSeparator,
          LoadingIndicator,
          Placeholder,
          Option: CustomOption
        }}
      />
    </Box>
  );
};
