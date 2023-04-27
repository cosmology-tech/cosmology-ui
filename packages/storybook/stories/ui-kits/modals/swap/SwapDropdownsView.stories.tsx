import { Box } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  handleSwapInput,
  SwapDropdownsView,
  SwapInputDataType,
  SwapOptionType
} from '@cosmology-ui/react';
import { ComponentStory } from '@storybook/react';
import Decimal from 'decimal.js';
import React, { useEffect, useState } from 'react';

import { chainList } from '../../../util/config';

// interface SwapInputDataReducer extends SwapInputDataType {
//   type: 'from' | 'to' | 'input';
// }

// const handleInputDataReducer = (
//   state: SwapInputDataType,
//   action: SwapInputDataReducer
// ) => {
//   switch (action.type) {
//     case 'from':
//       return {
//         ...state
//       };
//     case 'to':
//       return {
//         ...state
//       };
//     case 'input':
//       return {
//         ...state
//       };

//     default:
//       return {
//         ...state
//       };
//   }
// };

export const SwapDropdownsViewStory: ComponentStory<
  typeof SwapDropdownsView
> = (args) => {
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
      if (newVal.isPositive() && newVal.gte(0) && newVal.lte(fromAmount)) {
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
    updateInputData({
      from: {
        amount: formatData[0].displayAmount,
        dollar: formatData[0].dollarValue
      },
      to: {
        amount: formatData[1].displayAmount,
        dollar: formatData[1].dollarValue
      },
      invalidText: undefined
    });
    setFromToken(formatData[0]);
    setToToken(formatData[1]);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box mx="auto" maxW="md" height="640px" pt={10}>
      <SwapDropdownsView
        {...args}
        loading={loading}
        fromToken={fromToken}
        toToken={toToken}
        dropdownData={dropdownData}
        inputData={inputData}
        onFromDropdownChange={handleFromDropdownChange}
        onToDropdownChange={handleToDropdownChange}
        onAmountInputChange={handleInputChange}
        onSwapSwitch={handleSwitch}
      />
    </Box>
  );
};

SwapDropdownsViewStory.storyName = 'Swap Dropdowns View';
