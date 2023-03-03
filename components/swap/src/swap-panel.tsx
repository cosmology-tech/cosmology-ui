import {
  Box,
  Flex,
  SkeletonCircle,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useTheme } from '@cosmology-ui/theme';
import React from 'react';

import { SwapControlDropdownButton, SwapDropdown } from './swap-dropdown';
import { SwapEditableInput, SwapInputControlPanel } from './swap-input';
import { SwapSkeletonControlPanel } from './swap-skeleton';
import { SwapControlPanelType } from './type';

export const SwapPanelBaseStyle = (theme: string) => {
  return {
    px: 5,
    py: 4,
    w: 'full',
    position: 'relative',
    borderRadius: 'lg',
    bg: `swap-dropdown-background-color-${theme}`,
    color: `swap-panel-text-color-${theme}`,
    '>.swap-header': {
      w: 'full',
      minH: 7,
      mb: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      color: `swap-panel-header-color-${theme}`,
      '>.swap-input-control-panel': {
        justifyContent: 'end',
        alignItems: 'center',
        '>.swap-available-value': {
          alignItems: 'center',
          fontWeight: 'semibold',
          '>p': { color: `swap-panel-available-value-color-${theme}`, mr: 0.5 },
          '>span': {
            color: `swap-panel-header-color-${theme}`,
            mr: 2
          },
          '>.swap-available-value-skeleton': {
            pr: 1.5,
            '>:first-of-type': {
              w: 12,
              h: 5,
              borderRadius: 'base'
            }
          }
        },
        '>button': {
          py: 0.5,
          px: 2,
          ml: 2.5,
          w: 'fit-content',
          h: 'fit-content',
          bg: `swap-panel-input-control-button-background-color-${theme}`,
          color: `swap-panel-input-control-button-color-${theme}`
        }
      }
    },
    '>.swap-control-panel-box': {
      w: 'full',
      '>.swap-control-dropdown-button': {
        flex: 1,
        display: 'flex',
        justifyContent: 'start',
        minW: 'fit-content',
        w: 'full',
        h: 14,
        '>:first-of-type': {
          w: 12,
          h: 12,
          mr: 4,
          '>img': {
            w: 'full'
          }
        },
        '>:last-child>:first-of-type': {
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'semibold',
          fontSize: '2xl',
          lineHeight: 'none',
          mb: 1,
          '>svg': {
            ml: 2
          }
        },
        '>:last-child>:last-child': {
          textAlign: 'start',
          fontSize: 'sm',
          fontWeight: 'normal',
          lineHeight: 'none',
          opacity: 0.7
        }
      },
      '>.swap-skeleton-dropdown-button': {
        flex: 1,
        alignItems: 'center',
        '>:first-of-type': {
          w: 12,
          h: 12
        },
        '>.swap-dropdown-control-panel-skeleton': {
          justifyContent: 'center',
          alignItems: 'start',
          '>:first-of-type': {
            w: 28,
            h: 5,
            borderRadius: 'base'
          },
          '>:last-of-type': {
            w: 20,
            h: 4,
            borderRadius: 'base'
          }
        }
      },
      '>.swap-input-panel': {
        flex: 1,
        justifyContent: 'end',
        alignItems: 'center',
        overflow: 'hidden',
        '>.swap-editable-input-box': {
          w: 'full',
          textAlign: 'end',
          '>.swap-editable-input': {
            fontSize: 'xl',
            w: 'full',
            h: 'fit-content',
            p: 0,
            textAlign: 'end',
            border: 'none',
            borderRadius: 'none',
            _focus: {
              boxShadow: 'none'
            },
            _focusVisible: {
              boxShadow: 'none'
            },
            _invalid: {
              boxShadow: 'none',
              color: `swap-editable-input-invalid-color-${theme}`
            }
          },
          '>.swap-editable-text': {
            overflow: 'scroll',
            scrollbarWidth: 'none', // for firefox
            '::-webkit-scrollbar': {
              display: 'none' // for chrome
            },
            fontSize: '2xl',
            fontWeight: 'semibold',
            lineHeight: 'none',
            pb: 0.5,
            whiteSpace: 'nowrap'
          },
          '>.swap-fiat-text': {
            overflow: 'scroll',
            scrollbarWidth: 'none', // for firefox
            '::-webkit-scrollbar': {
              display: 'none' // for chrome
            },
            color: 'gray.500',
            fontSize: 'sm',
            lineHeight: 'normal',
            whiteSpace: 'nowrap'
          }
        },
        '>.swap-display-box': {
          w: 'full',
          textAlign: 'end',
          '>.swap-amount-text': {
            overflow: 'scroll',
            scrollbarWidth: 'none', // for firefox
            '::-webkit-scrollbar': {
              display: 'none' // for chrome
            },
            fontSize: '2xl',
            fontWeight: 'semibold',
            lineHeight: 'none',
            pb: 0.5,
            whiteSpace: 'nowrap'
          },
          '>.swap-fiat-text': {
            overflow: 'scroll',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none', // for firefox
            '::-webkit-scrollbar': {
              display: 'none' // for chrome
            },
            color: 'gray.500',
            fontSize: 'sm',
            lineHeight: 'normal'
          }
        }
      },
      '>.swap-skeleton-input-panel': {
        '>.swap-dropdown-control-panel-skeleton': {
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
      },
      '&.swap-control-panel-hidden': {
        visibility: 'hidden'
      }
    },
    '>.swap-dropdown-box': {
      w: 'full',
      mx: -5,
      position: 'absolute',
      top: 12,
      zIndex: 10
    }
  };
};

export const SwapControlPanel = ({
  inputLoading,
  dropdownLoading,
  dropdownData,
  selectedToken,
  swapType, // from or to
  inputControlPanel,
  amountValue,
  fiatValue,
  invalid,
  invalidText,
  className = 'swap-control-panel',
  styleProps,
  onDropdownChange,
  onAmountInputChange
}: SwapControlPanelType) => {
  const { theme } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      className={className}
      sx={styleProps ? styleProps : SwapPanelBaseStyle(theme)}
    >
      <Flex className="swap-header">
        <Text>{swapType}</Text>
        {inputControlPanel ? (
          <SwapInputControlPanel
            loading={inputLoading}
            amountValue={selectedToken?.amountValue}
            onAmountInputChange={onAmountInputChange}
          />
        ) : undefined}
      </Flex>
      <Flex
        className={`swap-control-panel-box ${
          isOpen ? 'swap-control-panel-hidden' : ''
        }`}
      >
        {dropdownLoading ? (
          <Stack isInline={true} className="swap-skeleton-dropdown-button">
            <SkeletonCircle />
            <SwapSkeletonControlPanel />
          </Stack>
        ) : (
          <SwapControlDropdownButton
            selectedToken={selectedToken}
            onOpen={onOpen}
          />
        )}
        {inputLoading ? (
          <Stack isInline={true} className="swap-skeleton-input-panel">
            <SwapSkeletonControlPanel />
          </Stack>
        ) : (
          <Flex className="swap-input-panel">
            {inputControlPanel ? (
              <SwapEditableInput
                id="swap-amount-input"
                amountValue={amountValue}
                fiatValue={fiatValue}
                invalid={invalid}
                invalidText={invalidText}
                selectedToken={selectedToken}
                onAmountInputChange={onAmountInputChange}
              />
            ) : undefined}
            {!inputControlPanel ? (
              <Box className="swap-display-box">
                <Text className="swap-amount-text">
                  {selectedToken.amountValue}
                </Text>
                <Text className="swap-fiat-text">
                  ~&nbsp;{selectedToken.fiatValue}
                </Text>
              </Box>
            ) : undefined}
          </Flex>
        )}
      </Flex>

      <Box className="swap-dropdown-box">
        <SwapDropdown
          isOpen={isOpen}
          loading={dropdownLoading}
          selectedToken={selectedToken}
          dropdownData={dropdownData}
          onClose={onClose}
          onDropdownChange={onDropdownChange}
        />
      </Box>
    </Box>
  );
};
