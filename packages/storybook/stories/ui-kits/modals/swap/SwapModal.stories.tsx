/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  handleSwapInput,
  SwapDetailsType,
  SwapInputDataType,
  SwapModal,
  SwapOptionType
} from '@cosmology-ui/react';
import { ComponentStory } from '@storybook/react';
import Decimal from 'decimal.js';
import React, { useEffect, useState } from 'react';

import { chainList } from '../../../util/config';

const defaultSlippages = ['1%', '2.5%', '3%', '5%'];

export const SwapModalStory: ComponentStory<typeof SwapModal> = (args) => {
  const [dropdownData, setDropdownData] = useState<SwapOptionType[]>([]);
  const [fromToken, setFromToken] = useState<SwapOptionType>();
  const [toToken, setToToken] = useState<SwapOptionType>();
  const [inputData, updateInputData] = useState<SwapInputDataType>({
    from: {
      amount: '0',
      dollar: '0'
    },
    to: {
      amount: '0',
      dollar: '0'
    },
    invalidText: undefined
  });
  const [loading, setLoading] = useState(true);
  const [tokenPrice, setTokenPrice] = useState({
    priceRate: '0',
    dollarValue: '0'
  });
  const [swapDetails, setSwapDetails] = useState<SwapDetailsType>();
  const [selectedSlippage, setSelectedSlippage] = useState(defaultSlippages[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFromDropdownChange: handleSwapDropdown = (newValue) => {
    if (newValue) {
      setFromToken(newValue);
      updateInputData({
        ...inputData,
        from: {
          amount: newValue.displayAmount,
          dollar: newValue.dollarValue
        },
        invalidText: undefined
      });
    }
  };
  const handleToDropdownChange: handleSwapDropdown = (newValue) => {
    if (newValue) {
      setToToken(newValue);
      updateInputData({
        ...inputData,
        to: {
          amount: newValue.displayAmount,
          dollar: newValue.dollarValue
        },
        invalidText: undefined
      });
    }
  };
  const handleInputChange: handleSwapInput = (newValue) => {
    if (!newValue) {
      updateInputData({
        from: { amount: '0', dollar: '0' },
        to: { amount: '0', dollar: '0' },
        invalidText: 'Please enter a value.'
      });
      setSwapDetails(undefined);
    }
    if (newValue && fromToken && toToken) {
      const newVal = new Decimal(newValue);
      const fromAmount = new Decimal(fromToken.amount);
      const toAmount = new Decimal(toToken.amount);

      if (newVal.eq(0)) {
        updateInputData({
          from: { amount: '0', dollar: '0' },
          to: { amount: '0', dollar: '0' },
          invalidText: undefined
        });
        setSwapDetails(undefined);
      }
      if (!newVal.isPositive()) {
        updateInputData({
          ...inputData,
          invalidText: 'Please enter a positive value.'
        });
      }
      if (newVal.gt(fromAmount)) {
        updateInputData({
          ...inputData,
          invalidText: `Please enter a value less than ${fromAmount.toString()}.`
        });
      }
      if (newVal.isPositive() && newVal.gt(0) && newVal.lte(fromAmount)) {
        updateInputData({
          from: {
            amount: newVal.toString(),
            dollar: newVal.div(0.05).toString()
          },
          to: {
            amount: toAmount.div(fromAmount.div(newVal)).toString(),
            dollar: toAmount.div(0.05).toString()
          },
          invalidText: undefined
        });
        if (fromToken && toToken && dropdownData.length > 0)
          setSwapDetails({
            priceImpact: '< 0.001%',
            swapFee: {
              percentage: '0.2%',
              value: '< $0.01'
            },
            expectedOutput: '6.024147',
            minimumReceived: '5.963906',
            route: {
              tokenIn: {
                logoUrl: fromToken.icon,
                symbol: fromToken.symbol
              },
              routes: [
                {
                  poolId: 'poolId1',
                  swapFee: '0.199%',
                  baseLogo: fromToken.icon,
                  baseSymbol: fromToken.symbol,
                  quoteLogo: dropdownData[2].icon,
                  quoteSymbol: dropdownData[2].symbol
                },
                {
                  poolId: 'poolId2',
                  swapFee: '0.199%',
                  baseLogo: dropdownData[2].icon,
                  baseSymbol: dropdownData[2].symbol,
                  quoteLogo: toToken.icon,
                  quoteSymbol: toToken.symbol
                }
              ],
              tokenOut: {
                logoUrl: toToken.icon,
                symbol: toToken.symbol
              }
            }
          });
      }
    }
  };
  const handleSwitch = () => {
    if (fromToken && toToken) {
      setFromToken(toToken);
      setToToken(fromToken);
      updateInputData({
        ...inputData,
        from: {
          amount: toToken.displayAmount,
          dollar: toToken.dollarValue
        },
        to: {
          amount: fromToken.displayAmount,
          dollar: fromToken.dollarValue
        },
        invalidText: undefined
      });
      setTokenPrice({
        priceRate: new Decimal(toToken.amount)
          .div(new Decimal(fromToken.amount))
          .toFixed(6),
        dollarValue: new Decimal(toToken.dollarValue)
          .div(new Decimal(fromToken.dollarValue))
          .toFixed(4)
      });
      if (dropdownData.length > 0)
        setSwapDetails({
          priceImpact: '< 0.001%',
          swapFee: {
            percentage: '0.2%',
            value: '< $0.01'
          },
          expectedOutput: '6.024147',
          minimumReceived: '5.963906',
          route: {
            tokenIn: {
              logoUrl: toToken.icon,
              symbol: toToken.symbol
            },
            routes: [
              {
                poolId: 'poolId1',
                swapFee: '0.199%',
                baseLogo: toToken.icon,
                baseSymbol: toToken.symbol,
                quoteLogo: dropdownData[2].icon,
                quoteSymbol: dropdownData[2].symbol
              },
              {
                poolId: 'poolId2',
                swapFee: '0.199%',
                baseLogo: dropdownData[2].icon,
                baseSymbol: dropdownData[2].symbol,
                quoteLogo: fromToken.icon,
                quoteSymbol: fromToken.symbol
              }
            ],
            tokenOut: {
              logoUrl: fromToken.icon,
              symbol: fromToken.symbol
            }
          }
        });
    }
  };

  useEffect(() => {
    const formatData = chainList.map(
      ({ label, symbol, icon, denom, amount, dollarValue }) => ({
        chainName: label,
        value: denom,
        symbol,
        icon,
        denom,
        amount,
        displayAmount: amount,
        dollarValue
      })
    );

    setDropdownData(formatData);
    setFromToken(formatData[0]);
    setToToken(formatData[1]);
    setTokenPrice({
      priceRate: new Decimal(formatData[1].amount)
        .div(new Decimal(formatData[0].amount))
        .toFixed(6),
      dollarValue: new Decimal(formatData[1].dollarValue)
        .div(new Decimal(formatData[0].dollarValue))
        .toFixed(4)
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box mx="auto" maxW="md" h="fit-content" minH="640px" pt={10}>
      <Button display="flex" mx="auto" onClick={onOpen}>
        Open Swap
      </Button>
      <SwapModal
        {...args}
        isOpen={isOpen}
        loading={loading}
        fromToken={fromToken}
        toToken={toToken}
        dropdownData={dropdownData}
        inputData={inputData}
        tokenPrice={tokenPrice}
        swapDetails={swapDetails}
        slippageConfig={{
          slippages: defaultSlippages,
          selectedSlippage: selectedSlippage,
          setSelectedSlippage: (value: string) => {
            setSelectedSlippage(value);
          }
        }}
        submitButtonConfig={{ loading: loading, disabled: !swapDetails }}
        onFromDropdownChange={handleFromDropdownChange}
        onToDropdownChange={handleToDropdownChange}
        onAmountInputChange={handleInputChange}
        onSwapSwitch={handleSwitch}
        onSwapSubmit={() => console.log('submit')}
        onClose={onClose}
      />
    </Box>
  );
};

SwapModalStory.storyName = 'Swap Modal';
