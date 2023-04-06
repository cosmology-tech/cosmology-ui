import { Box, Button, Divider, Flex, Skeleton, Text } from '@chakra-ui/react';
import { useTheme } from '@cosmology-ui/theme';
import React from 'react';

import { SwapDropdownsView } from './swap-dropdowns-view';
import { SwapSetting } from './swap-setting';
import { SwapViewType } from './type';

export const SwapViewBaseStyle = (theme: string) => {
  return {
    '>.swap-tolerance-box': {
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 'sm',
      py: 3.5,
      '>.swap-tolerance-title': {
        flex: 1,
        color: `swap-view-header-text-color-${theme}`
      },
      '>.swap-tolerance-value': {
        color: `swap-view-price-text-color-${theme}`,
        fontWeight: 'bold',
        mr: 2
      }
    },
    '>.swap-price-box': {
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 3.5,
      '>.swap-price-title': {
        flex: 1,
        fontSize: 'sm',
        color: `swap-view-header-text-color-${theme}`
      },
      '>.swap-price-value': {
        fontSize: 'sm',
        '>.swap-skeleton-box': {
          alignItems: 'center',
          '>.swap-skeleton-amount': {
            width: 36,
            height: 4,
            mr: 5
          },
          '>.swap-price-fiat': {
            color: `swap-view-header-text-color-${theme}`
          },
          '>.swap-skeleton-fiat': {
            width: 14,
            height: 4
          }
        },
        '>.swap-price-amount': {
          mr: 5,
          fontWeight: 'semibold',
          color: `swap-view-price-text-color-${theme}`
        },
        '>.swap-price-fiat': {
          color: `swap-view-header-text-color-${theme}`
        }
      }
    },
    '>.swap-submit-button': {
      w: 'full',
      h: 'fit-content',
      p: 0,
      py: 5,
      mt: 0.5,
      bg: `swap-view-submit-background-color-${theme}`,
      color: `swap-view-submit-text-color-${theme}`,
      boxShadow: `swap-view-submit-shadow-${theme}`,
      _hover: {
        bg: `swap-view-submit-hover-background-color-${theme}`
      },
      _active: {
        bg: `swap-view-submit-active-background-color-${theme}`,
        color: `swap-view-submit-active-text-color-${theme}`
      },
      _focus: {
        boxShadow: `swap-view-submit-focus-shadow-${theme}`
      },
      _disabled: {
        bg: `swap-view-submit-disabled-background-color-${theme}`,
        color: `swap-view-submit-disabled-text-color-${theme}`,
        _hover: {
          bg: `swap-view-submit-disabled-background-color-${theme}`
        },
        _active: {
          bg: `swap-view-submit-disabled-background-color-${theme}`
        },
        _focus: {
          boxShadow: 'none'
        }
      }
    }
  };
};

export const SwapView = ({
  dropdownData,
  fromDropdownLoading,
  fromInputLoading,
  fromToken,
  toDropdownLoading,
  toInputLoading,
  toToken,
  inputAmount,
  inputDollarValue,
  tokenArray,
  settingToken,
  priceValue,
  submitDisabled,
  submitLoading,
  className = 'swap-view',
  styleProps,
  onAmountInputChange,
  onFromDropdownChange,
  onToDropdownChange,
  onSwapSwitch,
  onSelectSetting,
  onSwapSubmit
}: SwapViewType) => {
  const { theme } = useTheme();
  return (
    <Box
      className={className}
      sx={styleProps ? styleProps : SwapViewBaseStyle(theme)}
    >
      <SwapDropdownsView
        dropdownData={dropdownData}
        fromDropdownLoading={fromDropdownLoading}
        fromInputLoading={fromInputLoading}
        fromToken={fromToken}
        toDropdownLoading={toDropdownLoading}
        toInputLoading={toInputLoading}
        toToken={toToken}
        inputAmount={inputAmount}
        inputDollarValue={inputDollarValue}
        onAmountInputChange={onAmountInputChange}
        onFromDropdownChange={onFromDropdownChange}
        onToDropdownChange={onToDropdownChange}
        onSwapSwitch={onSwapSwitch}
      />
      <Flex className="swap-tolerance-box">
        <Text className="swap-tolerance-title">Slippage tolerance</Text>
        <Text className="swap-tolerance-value">{settingToken}</Text>
        <SwapSetting
          settingToken={settingToken}
          tokenArray={tokenArray}
          onSelectSetting={onSelectSetting}
        />
      </Flex>
      <Divider />
      <Flex className="swap-price-box">
        <Text className="swap-price-title">Price</Text>
        <Box className="swap-price-value">
          {priceValue.loading ? (
            <Flex className="swap-skeleton-box">
              <Skeleton className="swap-skeleton-amount" />
              <Text className="swap-price-fiat">~ &nbsp;</Text>
              <Skeleton className="swap-skeleton-fiat" />
            </Flex>
          ) : (
            <>
              <Text as="span" className="swap-price-amount">
                {priceValue.rate.fromValue} {fromToken.symbol}&nbsp;=&nbsp;
                {priceValue.rate.toValue} {toToken.symbol}
              </Text>
              <Text as="span" className="swap-price-fiat">
                ~&nbsp;{priceValue.rate.dollarValue}
              </Text>
            </>
          )}
        </Box>
      </Flex>
      <Button
        className="swap-submit-button"
        isDisabled={submitDisabled}
        isLoading={submitLoading}
        onClick={onSwapSubmit}
      >
        Swap
      </Button>
    </Box>
  );
};
