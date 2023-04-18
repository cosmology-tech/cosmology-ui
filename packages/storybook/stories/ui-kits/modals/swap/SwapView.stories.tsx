import { Box } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  handleSwapInput,
  SwapDropdownsViewFromConfig,
  SwapDropdownsViewToConfig,
  SwapPriceType,
  SwapSlippageConfig,
  SwapView
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
const handleSlippageConfig = (
  state: SwapSlippageConfig,
  action: SwapSlippageConfig
) => {
  return {
    ...state,
    slippages: action.slippages,
    selectedSlippage: action.selectedSlippage
  };
};
const handlePriceConfig = (state: SwapPriceType, action: SwapPriceType) => {
  return {
    ...state,
    loading: action.loading,
    rate: action.rate,
    detail: action.detail
  };
};

const defaultSlippages = ['1%', '2.5%', '3%', '5%'];

export const SwapViewStory: ComponentStory<typeof SwapView> = (args) => {
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
  const [slippageConfig, updateSlippageConfig] = useReducer(
    handleSlippageConfig,
    {
      slippages: defaultSlippages,
      selectedSlippage: defaultSlippages[0]
    }
  );
  const [priceConfig, updatePriceConfig] = useReducer(handlePriceConfig, {
    loading: true,
    rate: {
      from: {
        symbol: undefined,
        value: undefined
      },
      to: {
        symbol: undefined,
        value: undefined
      },
      dollar: undefined
    },
    detail: undefined
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
            inputDollarValue: `$${decimalInput.div(0.05).toString()}`,
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
  const handleSlippageChange = (value: string) => {
    updateSlippageConfig({
      slippages: slippageConfig.slippages,
      selectedSlippage: value
    });
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
    updatePriceConfig({
      loading: false,
      rate: {
        from: {
          symbol: formatData[0].symbol,
          value: '1'
        },
        to: {
          symbol: formatData[1].symbol,
          value: '0.123456'
        },
        dollar: '$0.123'
      },
      detail: {
        priceImpact: '-0.07',
        swapFee: {
          percentage: '0.199%',
          value: '< $0.01'
        },
        expectedOutput: {
          value: '0.00096882373984234982',
          symbol: formatData[1].symbol
        },
        minimumReceived: {
          value: '0.00096882373984234982',
          symbol: formatData[1].symbol
        },
        route: {
          sellToken: {
            logoUrl: formatData[0].icon,
            denom: formatData[0].denom,
            amount: '0.15',
            name: formatData[0].value
          },
          routes: [
            {
              poolId: 'poolId1',
              swapFee: '0.199%',
              baseLogo: formatData[0].icon,
              baseSymbol: formatData[0].symbol,
              quoteLogo: formatData[2].icon,
              quoteSymbol: formatData[2].symbol
            },
            {
              poolId: 'poolId2',
              swapFee: '0.199%',
              baseLogo: formatData[2].icon,
              baseSymbol: formatData[2].symbol,
              quoteLogo: formatData[1].icon,
              quoteSymbol: formatData[1].symbol
            }
          ],
          buyToken: {
            logoUrl: formatData[1].icon,
            denom: formatData[1].denom,
            amount: '0.15',
            name: formatData[1].value
          }
        }
      }
    });
  }, []);

  return (
    <Box mx="auto" maxW="md" height="640px" pt={10}>
      <SwapView
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
        slippageConfig={slippageConfig}
        price={priceConfig}
        onFromDropdownChange={handleFromDropdownChange}
        onToDropdownChange={handleToDropdownChange}
        onAmountInputChange={handleInputChange}
        onSwapSwitch={handleSwitch}
        setSelectedSlippage={handleSlippageChange}
        onSwapSubmit={() => console.log('submit')}
      />
    </Box>
  );
};

SwapViewStory.args = {
  submitButtonConfig: {
    loading: true,
    disabled: false
  }
};

SwapViewStory.argTypes = {
  submitButtonConfig: {
    control: { type: 'object' }
  }
};

SwapViewStory.storyName = 'Swap View';
