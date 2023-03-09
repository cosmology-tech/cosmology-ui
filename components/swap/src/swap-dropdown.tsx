import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useOutsideClick
} from '@chakra-ui/react';
import { AnimateBox, DropdownVariants } from '@cosmology-ui/animation';
import { useTheme } from '@cosmology-ui/theme';
import {
  AsyncSelect,
  chakraComponents,
  ChakraStylesConfig,
  GroupBase,
  MenuListProps,
  OptionProps,
  PlaceholderProps,
  SelectInstance
} from 'chakra-react-select';
import { Searcher } from 'fast-fuzzy';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { SwapSkeletonOptions } from './swap-skeleton';
import {
  SwapControlDropdownButtonType,
  SwapDataType,
  SwapDropdownType
} from './type';

export const SwapDropdownMenuBaseShadowAnimate = (displayBlur: boolean) =>
  displayBlur
    ? {
        opacity: 1,
        height: 28,
        transition: {
          type: 'spring',
          duration: 0.1
        }
      }
    : {
        height: 0,
        opacity: 0,
        transition: {
          type: 'spring',
          duration: 0.2
        }
      };

export const SwapIndicatorSeparator = () => {
  return null;
};

export const SwapDropdownIndicator = () => {
  return null;
};

export const SwapDropdownMenuList = (
  props: MenuListProps<SwapDataType, false, GroupBase<SwapDataType>>
) => {
  const menuListRef = useRef<HTMLDivElement>(null);
  const [displayBlur, setDisplayBlur] = useState(false);

  useEffect(() => {
    if (props.options.length > 4) setDisplayBlur(true);
    if (props.options.length <= 4) setDisplayBlur(false);

    if (menuListRef.current) {
      const listEle = menuListRef.current.parentElement;

      const scrollHandler = () => {
        const height = Math.abs(
          listEle.scrollHeight - listEle.clientHeight - listEle.scrollTop
        );
        if (height < 1) setDisplayBlur(false);
        if (height >= 1) setDisplayBlur(true);
      };

      listEle.addEventListener('scroll', scrollHandler);
    }
  }, [props.options.length]);

  return (
    <Box className="swap-dropdown-menu-list-box">
      <chakraComponents.MenuList {...props}>
        <Box ref={menuListRef}>{props.children}</Box>
      </chakraComponents.MenuList>
      <AnimateBox
        className="swap-dropdown-menu-list-box-scroll-shadow"
        background="linear-gradient(0deg, rgba(237, 242, 247, 1) 6%, rgba(237, 242, 247, 0.85) 16%, rgba(237, 242, 247, 0.75) 24%, rgba(237, 242, 247, 0.65) 32%, rgba(237, 242, 247, 0.55) 48%, rgba(237, 242, 247, 0.35) 65%, rgba(237, 242, 247, 0.15) 80%, rgba(237, 242, 247, 0.05) 95%)"
        initial={false}
        animate={SwapDropdownMenuBaseShadowAnimate(displayBlur)}
      />
    </Box>
  );
};

export const SwapPlaceholder = (
  props: PlaceholderProps<SwapDataType, false, GroupBase<SwapDataType>>
) => {
  return (
    <chakraComponents.Placeholder {...props}>
      <Stack className="swap-dropdown-display-placeholder" isInline={true}>
        <SkeletonCircle className="swap-skeleton-options-logo" />
        <Text>Choose a token</Text>
        <Stack className="swap-skeleton-options-text">
          <Skeleton />
          <Skeleton />
        </Stack>
      </Stack>
    </chakraComponents.Placeholder>
  );
};

export const SwapOption = (
  props: OptionProps<SwapDataType, false, GroupBase<SwapDataType>>
) => {
  const optionData = props.data;
  return (
    <chakraComponents.Option {...props}>
      <Flex className="swap-dropdown-option">
        <Center>
          <Image
            alt={optionData.name}
            src={
              optionData.icon.png || optionData.icon.jpeg || optionData.icon.svg
            }
          />
        </Center>
        <Stack spacing={1}>
          <Text>{optionData.symbol}</Text>
          <Text>{optionData.label}</Text>
        </Stack>
        <Stack spacing={1}>
          <Text>{optionData.amountValue}</Text>
          <Text>{optionData.fiatValue}</Text>
        </Stack>
      </Flex>
    </chakraComponents.Option>
  );
};

export const SwapDropdownBaseStyle = (theme: string) => {
  const dropdownStyle: ChakraStylesConfig<
    SwapDataType,
    false,
    GroupBase<SwapDataType>
  > = {
    control: (provided) => ({
      ...provided,
      position: 'absolute',
      minH: 12,
      height: 16,
      lineHeight: 1,
      borderRadius: 'none',
      bg: `swap-dropdown-background-color-${theme}`,
      border: 'none',
      _focus: {
        boxShadow: 'none'
      }
    }),
    loadingIndicator: (provided) => ({ ...provided, opacity: 0.55 }),
    loadingMessage: (provided) => ({
      ...provided,
      '>.swap-skeleton-option': {
        w: 'full',
        h: 'full',
        justifyContent: 'space-between',
        mb: 4,
        pl: 2,
        pr: 1,
        _last: { mb: 2 },
        '>.swap-skeleton-options-logo': {
          w: 12,
          h: 12
        },
        '>.swap-skeleton-options-text': {
          justifyContent: 'center',
          borderRadius: 'base',
          '>:first-of-type': {
            w: 28,
            h: 4
          },
          '>:last-of-type': {
            w: 20,
            h: 3
          },
          _first: {
            flex: 1,
            alignItems: 'start'
          },
          _last: { flex: 1, alignItems: 'end' }
        }
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      w: 'full',
      left: 0,
      px: 5,
      mx: 0,
      '>.swap-dropdown-display-placeholder': {
        w: 'full',
        alignItems: 'center',
        '>p': {
          flex: 1,
          fontSize: 'lg',
          fontWeight: 'semibold',
          ml: 3
        },
        '>.swap-skeleton-options-logo': {
          w: 12,
          h: 12
        },
        '>.swap-skeleton-options-text': {
          justifyContent: 'center',
          alignItems: 'end',
          '>:first-of-type': {
            w: 24,
            h: 5,
            borderRadius: 'base'
          },
          '>:last-of-type': {
            w: 16,
            h: 4,
            borderRadius: 'base'
          }
        }
      }
    }),
    input: (provided, state) => ({
      ...provided,
      ml: state.value ? 0 : 16
    }),
    menu: (provided) => ({
      ...provided,
      mt: 16,
      mb: 0,
      pt: 1.5,
      bg: `swap-dropdown-background-color-${theme}`,
      borderRadius: '0 0 var(--chakra-radii-lg) var(--chakra-radii-lg)',
      overflow: 'hidden',
      '>.swap-dropdown-menu-list-box': {
        position: 'relative',
        '>.swap-dropdown-menu-list-box-scroll-shadow': {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          w: 'full',
          zIndex: 10
        }
      }
    }),
    menuList: (provided, state) => ({
      ...provided,
      p: 0,
      pl: 4,
      pr: state.options.length < 5 ? 4 : 0,
      pb: 1.5,
      bg: 'inherit',
      border: 'none',
      borderRadius: 'none',
      boxShadow: 'none',
      position: 'relative',
      // For Firefox
      scrollbarWidth: 'thin',
      scrollbarColor: `var(--chakra-colors-change-chain-dropdown-firefox-scrollbar-color-${theme})`,
      // For Chrome and other browsers except Firefox
      '&::-webkit-scrollbar': {
        width: '16px',
        background: `swap-dropdown-background-color-${theme}`,
        borderRadius: '3px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray.400',
        borderRadius: '10px',
        border: '6px solid transparent', // make it like padding
        backgroundClip: 'content-box'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      paddingInlineStart: 'unset',
      paddingInlineEnd: 'unset',
      p: 3,
      mb: 1,
      _last: { mb: 3 },
      borderRadius: 'base',
      bg: state.isSelected
        ? `swap-dropdown-option-selected-background-color-${theme}`
        : state.isFocused
        ? `swap-dropdown-option-hover-background-color-${theme}`
        : `swap-dropdown-background-color-${theme}`,
      color: `swap-dropdown-text-color-${theme}`,
      _hover: {
        bg: state.isSelected
          ? `swap-dropdown-option-selected-background-color-${theme}`
          : `swap-dropdown-option-hover-background-color-${theme}`
      },
      _disabled: {
        bg: 'transparent',
        _hover: {
          bg: 'transparent'
        }
      },
      '>.swap-dropdown-option': {
        w: 'full',
        alignItems: 'center',
        '>:first-of-type': {
          w: 10,
          h: 10,
          mr: 3,
          '>img': {
            w: 'full'
          }
        },
        '>:not(:first-of-type, :last-child)': {
          flex: 1,
          justifyContent: 'center',
          '>:first-of-type': {
            fontSize: 'lg',
            fontWeight: 'semibold',
            lineHeight: 'none'
          },
          '>:last-child': {
            fontSize: 'xs',
            fontWeight: 'normal',
            lineHeight: 'none',
            opacity: 0.7
          }
        },
        '>:last-child': {
          textAlign: 'end',
          '>:first-of-type': {
            fontSize: 'lg',
            fontWeight: 'semibold',
            lineHeight: 'none'
          },
          '>:last-child': {
            fontSize: 'xs',
            fontWeight: 'base',
            lineHeight: 'none',
            opacity: 0.7
          }
        }
      }
    })
  };
  return dropdownStyle;
};

export const SwapDropdown = ({
  isOpen,
  loading = false,
  dropdownData,
  selectedToken,
  className = 'swap-dropdown',
  styleProps,
  customComponents,
  onClose,
  onDropdownChange
}: SwapDropdownType) => {
  const { theme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const selectRef =
    useRef<SelectInstance<SwapDataType, false, GroupBase<SwapDataType>>>(null);

  useOutsideClick({
    ref: menuRef,
    handler: onClose
  });

  const [active, setActive] = useState<Element>(null);

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  useEffect(() => {
    if (active && isOpen && selectRef.current) {
      if (active.id === 'swap-control-dropdown-button') {
        selectRef.current.inputRef.focus();
      }
    }
  }, [active, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <AnimateBox
          ref={menuRef}
          variants={DropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <AsyncSelect
            ref={selectRef}
            id="select-swap-token"
            instanceId="select-swap-token"
            className={className}
            placeholder="Choose a token"
            chakraStyles={
              styleProps ? styleProps : SwapDropdownBaseStyle(theme)
            }
            menuIsOpen={true}
            isDisabled={false}
            isLoading={loading}
            isClearable={false}
            isMulti={false}
            isOptionDisabled={(option) =>
              option.disabled ? option.disabled : false
            }
            blurInputOnSelect={true}
            controlShouldRenderValue={false}
            loadingMessage={() => <SwapSkeletonOptions />}
            value={selectedToken}
            defaultOptions={dropdownData}
            menuPlacement="auto"
            loadOptions={(inputValue, callback) => {
              const searcher = new Searcher(dropdownData, {
                keySelector: (obj) => obj.label
              });
              callback(searcher.search(inputValue));
            }}
            onChange={(newValue, actionMeta) => {
              onClose();
              onDropdownChange(newValue, actionMeta);
            }}
            components={
              customComponents
                ? customComponents
                : {
                    IndicatorSeparator: SwapIndicatorSeparator,
                    DropdownIndicator: SwapDropdownIndicator,
                    Placeholder: SwapPlaceholder,
                    MenuList: SwapDropdownMenuList,
                    Option: SwapOption
                  }
            }
          />
        </AnimateBox>
      ) : undefined}
    </AnimatePresence>
  );
};

export const SwapControlDropdownButton = ({
  selectedToken,
  onOpen
}: SwapControlDropdownButtonType) => {
  return (
    <Button
      id="swap-control-dropdown-button"
      className="swap-control-dropdown-button"
      variant="unstyled"
      onClick={onOpen}
    >
      <Center>
        <Image
          alt={selectedToken ? selectedToken.name : 'chain-icon'}
          src={
            selectedToken
              ? selectedToken.icon.png ||
                selectedToken.icon.jpeg ||
                selectedToken.icon.svg
              : undefined
          }
        />
      </Center>
      <Box>
        <Text>
          {selectedToken.symbol ? selectedToken.symbol : undefined}
          <Icon as={RiArrowDownSLine} />
        </Text>
        <Text>{selectedToken.label ?? selectedToken.name ?? undefined}</Text>
      </Box>
    </Button>
  );
};
