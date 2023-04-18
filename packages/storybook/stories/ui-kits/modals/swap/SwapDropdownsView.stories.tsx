import { Box } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  handleSwapInput,
  SwapDropdownsView,
  SwapDropdownsViewFromConfig,
  SwapDropdownsViewToConfig
} from '@cosmology-ui/react';
import { ComponentStory } from '@storybook/react';
import Decimal from 'decimal.js';
import React, { useEffect, useReducer } from 'react';

import { chainList } from '../../../util/config';

interface FromConfigReducer extends SwapDropdownsViewFromConfig {
  updateType: 'dropdown' | 'input' | 'all';
}

const handleFromConfig = (
  state: SwapDropdownsViewFromConfig,
  action: FromConfigReducer
) => {
  switch (action.updateType) {
    case 'all':
      return {
        ...state,
        selectedToken: action.selectedToken,
        dropdownConfig: action.dropdownConfig,
        inputConfig: action.inputConfig
      };
    case 'dropdown':
      return {
        ...state,
        selectedToken: action.selectedToken,
        inputConfig: action.inputConfig
      };
    case 'input':
      return {
        ...state,
        inputConfig: action.inputConfig
      };

    default:
      return {
        ...state
      };
  }
};
const handleToConfig = (
  state: SwapDropdownsViewToConfig,
  action: SwapDropdownsViewToConfig
) => {
  return {
    ...state,
    selectedToken: action.selectedToken,
    dropdownConfig: action.dropdownConfig
  };
};

export const SwapDropdownsViewStory: ComponentStory<
  typeof SwapDropdownsView
> = (args) => {
  const [fromConfig, updateFromConfig] = useReducer(handleFromConfig, {
    selectedToken: undefined,
    inputConfig: {
      inputLoading: true,
      inputAmount: undefined,
      inputDollarValue: undefined,
      invalid: false,
      invalidText: undefined
    },
    dropdownConfig: {
      dropdownLoading: true,
      dropdownData: []
    }
  });
  const [toConfig, updateToConfig] = useReducer(handleToConfig, {
    selectedToken: undefined,
    dropdownConfig: {
      dropdownLoading: true,
      dropdownData: []
    }
  });

  const handleFromDropdownChange: handleSwapDropdown = (newValue) => {
    if (newValue)
      updateFromConfig({
        updateType: 'dropdown',
        selectedToken: {
          ...newValue,
          currentDisplayAmount: newValue.balanceDisplayAmount,
          currentDollarValue: newValue.dollarValue
        },
        inputConfig: {
          inputLoading: false,
          inputAmount: newValue.balanceDisplayAmount,
          inputDollarValue: newValue.dollarValue,
          invalid: false,
          invalidText: undefined
        },
        dropdownConfig: fromConfig.dropdownConfig
      });
  };
  const handleToDropdownChange: handleSwapDropdown = (newValue) => {
    if (newValue)
      updateToConfig({
        selectedToken: {
          ...newValue,
          currentDisplayAmount: newValue.balanceDisplayAmount,
          currentDollarValue: newValue.dollarValue
        },
        dropdownConfig: toConfig.dropdownConfig
      });
  };
  const handleInputChange: handleSwapInput = (newValue) => {
    if (!newValue) {
      updateFromConfig({
        updateType: 'input',
        selectedToken: fromConfig.selectedToken,
        dropdownConfig: fromConfig.dropdownConfig,
        inputConfig: {
          inputLoading: false,
          inputAmount: undefined,
          inputDollarValue: undefined,
          invalid: true,
          invalidText: 'Please enter a value.'
        }
      });
      if (toConfig.selectedToken)
        updateToConfig({
          selectedToken: {
            ...toConfig.selectedToken,
            currentDisplayAmount: undefined,
            currentDollarValue: undefined
          },
          dropdownConfig: toConfig.dropdownConfig
        });
    }
    if (newValue && fromConfig.selectedToken && toConfig.selectedToken) {
      const decimalInput = new Decimal(newValue);
      const decimalDefault = new Decimal(
        fromConfig.selectedToken.balanceDisplayAmount
      );
      if (decimalInput.toNumber() === 0) {
        updateFromConfig({
          updateType: 'input',
          selectedToken: fromConfig.selectedToken,
          dropdownConfig: fromConfig.dropdownConfig,
          inputConfig: {
            inputLoading: false,
            inputAmount: '0',
            inputDollarValue: undefined,
            invalid: false,
            invalidText: undefined
          }
        });
        updateToConfig({
          selectedToken: {
            ...toConfig.selectedToken,
            currentDisplayAmount: '0',
            currentDollarValue: undefined
          },
          dropdownConfig: toConfig.dropdownConfig
        });
      }
      if (decimalInput.toNumber() !== 0) {
        if (decimalInput.toNumber() === decimalDefault.toNumber()) {
          updateToConfig({
            selectedToken: {
              ...toConfig.selectedToken,
              currentDisplayAmount: toConfig.selectedToken.balanceDisplayAmount,
              currentDollarValue: toConfig.selectedToken.dollarValue
            },
            dropdownConfig: toConfig.dropdownConfig
          });
        }
        if (
          decimalInput.toNumber() > 0 &&
          decimalDefault.toNumber() > decimalInput.toNumber()
        ) {
          const decimalToAmount = new Decimal(
            toConfig.selectedToken.balanceDisplayAmount
          );
          updateToConfig({
            selectedToken: {
              ...toConfig.selectedToken,
              currentDisplayAmount: decimalToAmount
                .div(decimalDefault.div(decimalInput))
                .toString(),
              currentDollarValue: decimalToAmount
                .div(decimalDefault.div(decimalInput))
                .toString()
            },
            dropdownConfig: toConfig.dropdownConfig
          });
        }
      }
      if (!decimalInput.isPositive()) {
        updateFromConfig({
          updateType: 'input',
          selectedToken: fromConfig.selectedToken,
          dropdownConfig: fromConfig.dropdownConfig,
          inputConfig: {
            inputLoading: false,
            inputAmount: fromConfig.selectedToken.balanceDisplayAmount,
            inputDollarValue: fromConfig.selectedToken.dollarValue,
            invalid: true,
            invalidText: 'Please enter a positive value.'
          }
        });
      }
      if (decimalInput.toNumber() > decimalDefault.toNumber()) {
        updateFromConfig({
          updateType: 'input',
          selectedToken: fromConfig.selectedToken,
          dropdownConfig: fromConfig.dropdownConfig,
          inputConfig: {
            inputLoading: false,
            inputAmount: fromConfig.selectedToken.balanceDisplayAmount,
            inputDollarValue: fromConfig.selectedToken.dollarValue,
            invalid: true,
            invalidText: `Please enter a value less than ${fromConfig.selectedToken.balanceDisplayAmount}.`
          }
        });
      }
      if (
        decimalInput.toNumber() !== 0 &&
        !(decimalInput.toNumber() > decimalDefault.toNumber()) &&
        decimalInput.isPositive()
      ) {
        updateFromConfig({
          updateType: 'input',
          selectedToken: fromConfig.selectedToken,
          dropdownConfig: fromConfig.dropdownConfig,
          inputConfig: {
            inputLoading: false,
            inputAmount: newValue,
            inputDollarValue: decimalInput.div(0.05).toString(),
            invalid: false,
            invalidText: undefined
          }
        });
      }
    }
  };
  const handleSwitch = () => {
    if (fromConfig.selectedToken && toConfig.selectedToken) {
      updateFromConfig({
        updateType: 'all',
        selectedToken: toConfig.selectedToken,
        inputConfig: {
          inputLoading: false,
          inputAmount: toConfig.selectedToken.balanceDisplayAmount,
          inputDollarValue: toConfig.selectedToken.dollarValue,
          invalid: false,
          invalidText: undefined
        },
        dropdownConfig: toConfig.dropdownConfig
      });
      updateToConfig({
        selectedToken: fromConfig.selectedToken,
        dropdownConfig: fromConfig.dropdownConfig
      });
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

    updateFromConfig({
      updateType: 'all',
      selectedToken: {
        ...formatData[0],
        currentDisplayAmount: formatData[0].balanceDisplayAmount,
        currentDollarValue: formatData[0].dollarValue
      },
      inputConfig: {
        inputLoading: false,
        inputAmount: formatData[0].balanceDisplayAmount,
        inputDollarValue: formatData[0].dollarValue,
        invalid: false,
        invalidText: undefined
      },
      dropdownConfig: {
        dropdownLoading: false,
        dropdownData: formatData
      }
    });
    updateToConfig({
      selectedToken: {
        ...formatData[1],
        currentDisplayAmount: formatData[1].balanceDisplayAmount,
        currentDollarValue: formatData[1].dollarValue
      },
      dropdownConfig: {
        dropdownLoading: false,
        dropdownData: formatData
      }
    });
  }, []);

  return (
    <Box mx="auto" maxW="md" height="640px" pt={10}>
      <SwapDropdownsView
        {...args}
        fromConfig={{
          selectedToken: fromConfig.selectedToken,
          inputConfig: fromConfig.inputConfig,
          dropdownConfig: fromConfig.dropdownConfig
        }}
        toConfig={{
          selectedToken: toConfig.selectedToken,
          dropdownConfig: toConfig.dropdownConfig
        }}
        onFromDropdownChange={handleFromDropdownChange}
        onToDropdownChange={handleToDropdownChange}
        onAmountInputChange={handleInputChange}
        onSwapSwitch={handleSwitch}
      />
    </Box>
  );
};

SwapDropdownsViewStory.storyName = 'Swap Dropdowns View';
