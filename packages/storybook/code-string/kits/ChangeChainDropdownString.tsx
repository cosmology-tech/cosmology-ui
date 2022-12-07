export const ChangeChainDropdownString = `import {
    Box,
    Icon,
    Image,
    Skeleton,
    SkeletonCircle,
    Stack,
    SystemStyleObject,
    Text,
    useBreakpointValue,
    useColorMode
  } from '@chakra-ui/react';
  import {
    AsyncSelect,
    chakraComponents,
    DropdownIndicatorProps,
    GroupBase,
    LoadingIndicatorProps,
    OptionProps,
    PlaceholderProps
  } from 'chakra-react-select';
  import { Searcher } from 'fast-fuzzy';
  import React from 'react';
  import { FiChevronDown } from 'react-icons/fi';
  
  import {
    ChangeChainDropdownType,
    ChangeChainMenuType,
    DataType,
    handleChangeColorModeValue
  } from '../../index';
  
  const SkeletonOptions = () => {
    return (
      <Stack isInline={true} alignItems="center" spacing={3}>
        <SkeletonCircle w={10} h={10} />
        <Skeleton w={40} h={6} />
      </Stack>
    );
  };
  
  const IndicatorSeparator = () => {
    return null;
  };
  
  const LoadingIndicator = (props: LoadingIndicatorProps<DataType>) => {
    const { colorMode } = useColorMode();
    return (
      <chakraComponents.LoadingIndicator
        color={handleChangeColorModeValue(
          colorMode,
          'primary.200',
          'primary.400'
        )}
        emptyColor="transparent"
        speed="0.45s"
        thickness="2px"
        {...props}
      />
    );
  };
  
  const DropdownIndicator = (
    props: DropdownIndicatorProps<DataType, false, GroupBase<DataType>>
  ) => {
    const { colorMode } = useColorMode();
    return (
      <chakraComponents.DropdownIndicator {...props}>
        <Icon
          as={FiChevronDown}
          color={handleChangeColorModeValue(
            colorMode,
            'blackAlpha.600',
            'whiteAlpha.600'
          )}
        />
      </chakraComponents.DropdownIndicator>
    );
  };
  
  const Placeholder = (props: PlaceholderProps<DataType>) => {
    const { colorMode } = useColorMode();
    if (props.hasValue) {
      return (
        <chakraComponents.Placeholder {...props}>
          <Stack
            id={props.getValue()[0].label}
            isInline={true}
            alignItems="center"
            spacing={2}
            overflow="hidden"
            wordBreak="break-word"
            color={handleChangeColorModeValue(
              colorMode,
              'blackAlpha.800',
              'whiteAlpha.800'
            )}
            w="full"
          >
            <Box
              minW={8}
              minH={8}
              maxW={8}
              maxH={8}
              w="full"
              h="full"
              border="1px solid"
              borderColor={handleChangeColorModeValue(
                colorMode,
                'blackAlpha.200',
                'whiteAlpha.200'
              )}
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                src={
                  props.getValue()[0].icon?.png ||
                  props.getValue()[0].icon?.jpeg ||
                  props.getValue()[0].icon?.svg
                }
                fallbackSrc={'https://dummyimage.com/150/9e9e9e/ffffff&text=chain-name'}
                alt={props.getValue()[0].chainName}
              />
            </Box>
            <Text opacity={0.85}>{props.getValue()[0].label}</Text>
          </Stack>
        </chakraComponents.Placeholder>
      );
    }
    return <chakraComponents.Placeholder {...props} />;
  };
  
  const CustomOption = ({
    children,
    ...props
  }: OptionProps<DataType, false, GroupBase<DataType>>) => {
    const { colorMode } = useColorMode();
    return (
      <chakraComponents.Option {...props}>
        <Stack
          id={props.label}
          isInline={true}
          alignItems="center"
          spacing={2}
          overflow="hidden"
          wordBreak="break-word"
          color={handleChangeColorModeValue(
            colorMode,
            'blackAlpha.800',
            'whiteAlpha.800'
          )}
          w="full"
        >
          <Box
            minW={8}
            minH={8}
            maxW={8}
            maxH={8}
            w="full"
            h="full"
            border="1px solid"
            borderColor={handleChangeColorModeValue(
              colorMode,
              'blackAlpha.200',
              'whiteAlpha.200'
            )}
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              alt={props.data.chainName}
              src={
                props.data.icon?.png ||
                props.data.icon?.jpeg ||
                props.data.icon?.svg
              }
              fallbackSrc={'https://dummyimage.com/150/9e9e9e/ffffff&text=chain-name'}
            />
          </Box>
          <Text fontSize="md" fontWeight="medium" opacity={0.8}>
            {children}
          </Text>
        </Stack>
      </chakraComponents.Option>
    );
  };
  
  const SelectOptions = ({
    data,
    value,
    dropdownLoading,
    dropdownDisabled,
    onChange
  }: ChangeChainMenuType) => {
    const { colorMode } = useColorMode();
    const menuHeight = useBreakpointValue({ base: 60, md: 56 });
    const customStyles = {
      control: (provided: SystemStyleObject) => ({
        ...provided,
        minH: 8,
        height: 12,
        lineHeight: 1,
        borderRadius: 'lg',
        _focus: {
          borderColor: 'transparent',
          boxShadow: '0 0 0 2px #929ce4'
        }
      }),
      menu: (provided: SystemStyleObject) => ({
        ...provided,
        h: menuHeight,
        mt: 2,
        mb: 2,
        bg: handleChangeColorModeValue(colorMode, 'white', 'gray.900'),
        boxShadow: handleChangeColorModeValue(
          colorMode,
          '0 1px 5px #e3e3e3',
          '0 0px 4px #4b4b4b'
        ),
        borderRadius: '0.4rem'
      }),
      menuList: (provided: SystemStyleObject) => ({
        ...provided,
        h: menuHeight,
        bg: 'transparent',
        border: 'none',
        borderRadius: 'none',
        pl: 2,
        pr: 0.5,
        // For Firefox
        scrollbarWidth: 'auto',
        scrollbarColor: handleChangeColorModeValue(
          colorMode,
          'rgba(0,0,0,0.3) rgba(0,0,0,0.2)',
          'rgba(255,255,255,0.2) rgba(255,255,255,0.1)'
        ),
        // For Chrome and other browsers except Firefox
        '&::-webkit-scrollbar': {
          width: '8px',
          background: 'transparent',
          borderRadius: '3px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: handleChangeColorModeValue(
            colorMode,
            'rgba(0,0,0,0.1)',
            'rgba(255,255,255,0.1)'
          ),
          borderRadius: '10px',
          border: '2px solid transparent',
          backgroundClip: 'content-box'
        }
      }),
      placeholder: (provided: SystemStyleObject) => ({
        ...provided,
        fontSize: 'md',
        fontWeight: 'medium'
      }),
      clearIndicator: (provided: SystemStyleObject) => ({
        ...provided,
        borderRadius: 'full',
        color: handleChangeColorModeValue(
          colorMode,
          'blackAlpha.600',
          'whiteAlpha.600'
        ),
        w: 6,
        h: 6,
        '>svg': {
          w: 2.5,
          h: 2.5
        }
      }),
      dropdownIndicator: (provided: SystemStyleObject) => ({
        ...provided,
        bg: 'transparent',
        pl: 0.5
      }),
      option: (
        provided: SystemStyleObject,
        state: { isSelected: boolean; isFocused: boolean }
      ) => {
        return {
          ...provided,
          display: 'flex',
          borderRadius: 'lg',
          minH: 8,
          h: 'auto',
          p: '0.4rem 0.5rem',
          color: 'inherit',
          bg: handleChangeColorModeValue(
            colorMode,
            state.isSelected // white
              ? state.isFocused
                ? 'primary.100'
                : 'primary.50'
              : state.isFocused
              ? 'blackAlpha.100'
              : 'transparent',
            state.isSelected // dark
              ? state.isFocused
                ? 'primary.600'
                : 'primary.500'
              : state.isFocused
              ? 'whiteAlpha.200'
              : 'transparent'
          ),
          _notFirst: {
            mt: 1
          },
          _active: {
            bg: 'primary.100'
          },
          _disabled: { bg: 'transparent', _hover: { bg: 'transparent' } }
        };
      }
    };
  
    return (
      <AsyncSelect
        id="select-chain"
        instanceId="select-chain"
        placeholder="Choose a chain"
        chakraStyles={customStyles}
        isDisabled={dropdownDisabled}
        isLoading={dropdownLoading}
        isClearable={true}
        isMulti={false}
        isOptionDisabled={(option) => (option.disabled ? option.disabled : false)}
        blurInputOnSelect={true}
        controlShouldRenderValue={false}
        loadingMessage={() => <SkeletonOptions />}
        value={value}
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
    );
  };
  
  export const ChangeChainDropdown = ({
    data,
    selectedItem,
    dropdownLoading,
    dropdownDisabled,
    onChange
  }: ChangeChainDropdownType) => {
    return (
      <Box w="full" h="full" position="relative" zIndex={150}>
        <SelectOptions
          data={data}
          value={selectedItem}
          dropdownLoading={dropdownLoading}
          dropdownDisabled={dropdownDisabled}
          onChange={onChange}
        />
      </Box>
    );
  };
  `;
