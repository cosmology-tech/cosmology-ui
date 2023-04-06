/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Text } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  SwapDataType,
  SwapDropdownsView
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Decimal from 'decimal.js';
import React, { useCallback, useEffect, useReducer, useState } from 'react';

import { chainList } from '../../../util/config';

enum SwapValueType {
  INITIAL = 'INITIAL',
  VALID = 'VALID',
  NOTPOSITIVE = 'NOTPOSITIVE',
  NOVALUE = 'NOVALUE',
  UPDATE = 'UPDATE',
  OVERMAXIMUM = 'OVERMAXIMUM'
}
interface UpdateDropdownReducer {
  selectedToken?: SwapDataType;
  dropdownLoading?: boolean;
  inputLoading?: boolean;
}
interface UpdateInputReducer {
  inputLoading?: boolean;
  inputAmount?: string;
  inputDollarValue?: string;
  invalid: boolean;
  invalidText?: string;
}
interface UpdateReducerAction extends UpdateInputReducer {
  type: SwapValueType;
}

function updateDropdownReducer(
  state: UpdateDropdownReducer,
  action: UpdateDropdownReducer
): UpdateDropdownReducer {
  return {
    ...state,
    selectedToken: action.selectedToken,
    dropdownLoading: action.dropdownLoading,
    inputLoading: action.inputLoading
  };
}
function updateInputReducer(
  state: UpdateInputReducer,
  action: UpdateReducerAction
): UpdateInputReducer {
  switch (action.type) {
    case SwapValueType.INITIAL:
      return {
        ...state,
        inputLoading: action.inputLoading,
        invalid: action.invalid,
        inputAmount: action.inputAmount,
        inputDollarValue: action.inputDollarValue
      };
    case SwapValueType.UPDATE:
      return {
        ...state,
        inputLoading: action.inputLoading,
        invalid: action.invalid,
        inputAmount: action.inputAmount,
        inputDollarValue: action.inputDollarValue
      };
    case SwapValueType.NOTPOSITIVE:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        inputAmount: action.inputAmount,
        inputDollarValue: action.inputDollarValue
      };
    case SwapValueType.OVERMAXIMUM:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        inputAmount: action.inputAmount,
        inputDollarValue: action.inputDollarValue
      };
    case SwapValueType.NOVALUE:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        inputAmount: action.inputAmount,
        inputDollarValue: action.inputDollarValue
      };
    case SwapValueType.VALID:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        inputAmount: action.inputAmount,
        inputDollarValue: action.inputDollarValue
      };

    default: {
      return state;
    }
  }
}

const Template: ComponentStory<typeof SwapDropdownsView> = ({
  dropdownData,
  onAmountInputChange,
  onFromDropdownChange,
  onToDropdownChange,
  onSwapSwitch,
  ...rest
}) => {
  const [chainData, setChainData] = useState<SwapDataType[]>([]);
  const [fromToken, updateFromToken] = useReducer(updateDropdownReducer, {
    selectedToken: undefined,
    dropdownLoading: true,
    inputLoading: true
  });
  const [toToken, updateToToken] = useReducer(updateDropdownReducer, {
    selectedToken: undefined,
    dropdownLoading: true,
    inputLoading: true
  });
  const [inputEvent, updateInputEvent] = useReducer(updateInputReducer, {
    inputAmount: undefined,
    inputDollarValue: '$-',
    invalid: false,
    invalidText: undefined,
    inputLoading: true
  });

  const handleInputChange = (value: string, selectedToken: SwapDataType) => {
    if (!value) {
      updateInputEvent({
        type: SwapValueType.NOVALUE,
        inputAmount: '0',
        inputDollarValue: '$-',
        invalid: true,
        invalidText: 'Please enter a value.'
      });
    }
    if (value) {
      const decimalInput = new Decimal(value);
      const decimalDefault = new Decimal(selectedToken.amount);
      if (!decimalInput.isPositive()) {
        updateInputEvent({
          type: SwapValueType.NOTPOSITIVE,
          inputAmount: selectedToken.amount,
          inputDollarValue: selectedToken.dollarValue,
          invalid: true,
          invalidText: 'Please enter a positive value.'
        });
      }
      if (decimalInput.toNumber() > decimalDefault.toNumber()) {
        updateInputEvent({
          type: SwapValueType.OVERMAXIMUM,
          inputAmount: selectedToken.amount,
          inputDollarValue: selectedToken.dollarValue,
          invalid: true,
          invalidText: `Please enter a value less than ${selectedToken.amount}.`
        });
      }
      if (
        !(decimalInput.toNumber() > decimalDefault.toNumber()) &&
        decimalInput.isPositive()
      ) {
        updateInputEvent({
          type: SwapValueType.VALID,
          inputAmount: value,
          inputDollarValue: decimalInput.div(0.05).toString(),
          invalid: false,
          invalidText: undefined
        });
      }
      if (decimalDefault.eq(decimalInput)) {
        if (toToken.selectedToken) {
          updateToToken({
            selectedToken: {
              ...toToken.selectedToken,
              currentAmount: toToken.selectedToken.amount
            },
            dropdownLoading: false,
            inputLoading: false
          });
        }
      }
      if (!decimalDefault.eq(decimalInput)) {
        if (toToken.selectedToken) {
          const fromAmount = new Decimal(selectedToken.amount);
          const toDecimal = new Decimal(toToken.selectedToken.amount);
          const i = fromAmount.div(decimalInput);
          const toAmount = toDecimal.div(i).toFixed(6);

          updateToToken({
            selectedToken: {
              ...toToken.selectedToken,
              currentAmount: toAmount
            },
            dropdownLoading: false,
            inputLoading: false
          });
        }
      }
    }
  };
  const handleFromDropdownChange: handleSwapDropdown = (value) => {
    if (value) {
      updateInputEvent({
        type: SwapValueType.UPDATE,
        inputLoading: false,
        invalid: false,
        inputAmount: value.currentAmount,
        inputDollarValue: value.currentDollarValue
      });
      updateFromToken({
        selectedToken: value
      });
    }
  };
  const handleToDropdownChange: handleSwapDropdown = (value) => {
    if (value) {
      updateToToken({
        selectedToken: value
      });
    }
  };
  const handleSwapSwitch = useCallback(() => {
    updateFromToken({
      selectedToken: toToken.selectedToken
    });
    updateToToken({
      selectedToken: fromToken.selectedToken
    });
    if (toToken.selectedToken)
      updateInputEvent({
        type: SwapValueType.INITIAL,
        inputLoading: false,
        invalid: false,
        inputAmount: toToken.selectedToken.amount,
        inputDollarValue: toToken.selectedToken.dollarValue
      });
  }, [fromToken.selectedToken, toToken.selectedToken]);

  useEffect(() => {
    const formatData = chainList.map(
      ({ label, symbol, icon, denom, amount, dollarValue }) => ({
        value: label,
        symbol,
        icon,
        denom,
        amount,
        dollarValue,
        currentAmount: amount,
        currentDollarValue: dollarValue
      })
    );
    setTimeout(() => {
      setChainData(formatData);
    }, 800);
  }, []);

  useEffect(() => {
    if (chainData.length > 0) {
      updateFromToken({
        selectedToken: chainData[0],
        dropdownLoading: false
      });
      updateToToken({
        selectedToken: chainData[1],
        dropdownLoading: false,
        inputLoading: false
      });
      updateInputEvent({
        type: SwapValueType.INITIAL,
        inputLoading: false,
        invalid: false,
        inputAmount: chainData[0].currentAmount,
        inputDollarValue: chainData[0].currentDollarValue
      });
    }
  }, [chainData]);

  return (
    <Box py={16}>
      <Box maxW="md" mx="auto">
        <SwapDropdownsView
          dropdownData={chainData}
          fromDropdownLoading={fromToken.dropdownLoading}
          fromInputLoading={inputEvent.inputLoading}
          fromToken={fromToken.selectedToken}
          toDropdownLoading={toToken.dropdownLoading}
          toInputLoading={toToken.inputLoading}
          toToken={toToken.selectedToken}
          inputAmount={inputEvent.inputAmount}
          inputDollarValue={inputEvent.inputDollarValue}
          invalid={inputEvent.invalid}
          invalidText={inputEvent.invalidText}
          onAmountInputChange={(value) => {
            if (fromToken.selectedToken)
              handleInputChange(value, fromToken.selectedToken);
          }}
          onFromDropdownChange={handleFromDropdownChange}
          onToDropdownChange={handleToDropdownChange}
          onSwapSwitch={handleSwapSwitch}
          {...rest}
        />
      </Box>
    </Box>
  );
};

export const swapDropdownsView = Template.bind({});

// to hide controls
swapDropdownsView.parameters = {
  controls: {
    include: []
  }
};

export default {
  title: 'Components/Modals/Swap',
  component: SwapDropdownsView,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Swap Dropdowns View
          </Text>
          <Primary />
          <ArgsTable of={SwapDropdownsView} />
        </>
      )
    }
  }
} as ComponentMeta<typeof SwapDropdownsView>;
