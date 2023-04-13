import { Box } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  handleSwapInput,
  SwapControlPanel,
  SwapDropdownConfig,
  SwapInputConfig,
  SwapTokenType,
  SwapType
} from '@cosmology-ui/react';
import { ComponentStory } from '@storybook/react';
import Decimal from 'decimal.js';
import React, { useEffect, useReducer } from 'react';

import { chainList } from '../../../util/config';

interface UpdateSelectedToken {
  value: SwapTokenType | undefined;
}

const updateDropdownReducer = (
  state: SwapDropdownConfig,
  action: SwapDropdownConfig
): SwapDropdownConfig => {
  return {
    ...state,
    dropdownLoading: action.dropdownLoading,
    dropdownData: action.dropdownData
  };
};
const updateInputReducer = (
  state: SwapInputConfig,
  action: SwapInputConfig
): SwapInputConfig => {
  return {
    ...state,
    inputLoading: action.inputLoading,
    inputAmount: action.inputAmount,
    inputDollarValue: action.inputDollarValue,
    invalid: action.invalid,
    invalidText: action.invalidText
  };
};
const updateSelectedTokenReducer = (
  state: UpdateSelectedToken,
  action: UpdateSelectedToken
): UpdateSelectedToken => {
  return { ...state, value: action.value };
};

export const SwapControlPanelStory: ComponentStory<typeof SwapControlPanel> = (
  args
) => {
  const { swapType } = args;
  const [selectedToken, updateSelectedToken] = useReducer(
    updateSelectedTokenReducer,
    {
      value: undefined
    }
  );
  const [dropdownConfig, updateDropdownConfig] = useReducer(
    updateDropdownReducer,
    {
      dropdownLoading: true,
      dropdownData: undefined
    }
  );
  const [inputEvent, updateInputEvent] = useReducer(updateInputReducer, {
    inputLoading: true,
    inputAmount: undefined,
    inputDollarValue: '$-',
    invalid: false,
    invalidText: undefined
  });

  const handleDropdownChange: handleSwapDropdown = (newValue) => {
    if (newValue) {
      updateSelectedToken({
        value: {
          ...newValue,
          currentDisplayAmount: newValue.balanceDisplayAmount,
          currentDollarValue: newValue.dollarValue
        }
      });
      updateInputEvent({
        inputLoading: false,
        inputAmount: newValue.balanceDisplayAmount,
        inputDollarValue: `$${newValue.dollarValue}`,
        invalid: false,
        invalidText: undefined
      });
    }
  };
  const handleInputChange: handleSwapInput = (newValue) => {
    if (!newValue) {
      updateInputEvent({
        inputLoading: false,
        inputAmount: '0',
        inputDollarValue: '$-',
        invalid: true,
        invalidText: 'Please enter a value.'
      });
    }
    if (newValue && selectedToken.value) {
      const decimalInput = new Decimal(newValue);
      const decimalDefault = new Decimal(
        selectedToken.value.balanceDisplayAmount
      );
      if (!decimalInput.isPositive()) {
        updateInputEvent({
          inputLoading: false,
          inputAmount: selectedToken.value.balanceDisplayAmount,
          inputDollarValue: selectedToken.value.dollarValue,
          invalid: true,
          invalidText: 'Please enter a positive value.'
        });
      }
      if (decimalInput.toNumber() > decimalDefault.toNumber()) {
        updateInputEvent({
          inputLoading: false,
          inputAmount: selectedToken.value.balanceDisplayAmount,
          inputDollarValue: selectedToken.value.dollarValue,
          invalid: true,
          invalidText: `Please enter a value less than ${selectedToken.value.balanceDisplayAmount}.`
        });
      }
      if (
        !(decimalInput.toNumber() > decimalDefault.toNumber()) &&
        decimalInput.isPositive()
      ) {
        updateInputEvent({
          inputLoading: false,
          inputAmount: newValue,
          inputDollarValue: decimalInput.div(0.05).toString(),
          invalid: false,
          invalidText: undefined
        });
      }
    }
  };

  useEffect(() => {
    const formatData = chainList.map(
      ({ label, symbol, icon, denom, amount, dollarValue }) => ({
        value: label,
        symbol,
        icon,
        denom,
        balanceDisplayAmount: amount,
        dollarValue
      })
    );

    setTimeout(() => {
      updateDropdownConfig({
        dropdownLoading: false,
        dropdownData: formatData
      });
      updateSelectedToken({
        value: {
          ...formatData[0],
          currentDisplayAmount: formatData[0].balanceDisplayAmount,
          currentDollarValue: formatData[0].dollarValue
        }
      });
    }, 1000);
  }, []);
  useEffect(() => {
    if (swapType === SwapType.from && selectedToken.value) {
      updateInputEvent({
        inputLoading: false,
        inputAmount: selectedToken.value.balanceDisplayAmount,
        inputDollarValue: `${selectedToken.value.dollarValue}`,
        invalid: false,
        invalidText: undefined
      });
    }
  }, [swapType, selectedToken]);

  return (
    <Box position="relative" mx="auto" maxW="md" height={96} pt={10}>
      <SwapControlPanel
        {...args}
        selectedToken={selectedToken.value}
        dropdownConfig={dropdownConfig}
        inputConfig={inputEvent}
        onDropdownChange={handleDropdownChange}
        onAmountInputChange={handleInputChange}
      />
    </Box>
  );
};

SwapControlPanelStory.args = {
  swapType: SwapType.from
};
SwapControlPanelStory.argTypes = {
  swapType: {
    control: { type: 'radio' },
    options: [SwapType.to, SwapType.from]
  }
};

SwapControlPanelStory.storyName = 'Swap Control Panel';
