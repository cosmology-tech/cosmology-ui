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
  amountValue?: string;
  fiatValue?: string;
  invalid: boolean;
  invalidText?: string;
  isInputLoading?: boolean;
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
        isInputLoading: action.isInputLoading,
        invalid: action.invalid,
        amountValue: action.amountValue,
        fiatValue: action.fiatValue
      };
    case SwapValueType.UPDATE:
      return {
        ...state,
        isInputLoading: action.isInputLoading,
        invalid: action.invalid,
        amountValue: action.amountValue,
        fiatValue: action.fiatValue
      };
    case SwapValueType.NOTPOSITIVE:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        amountValue: action.amountValue,
        fiatValue: action.fiatValue
      };
    case SwapValueType.OVERMAXIMUM:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        amountValue: action.amountValue,
        fiatValue: action.fiatValue
      };
    case SwapValueType.NOVALUE:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        amountValue: action.amountValue,
        fiatValue: action.fiatValue
      };
    case SwapValueType.VALID:
      return {
        ...state,
        invalid: action.invalid,
        invalidText: action.invalidText,
        amountValue: action.amountValue,
        fiatValue: action.fiatValue
      };

    default: {
      return state;
    }
  }
}

const Template: ComponentStory<typeof SwapDropdownsView> = ({ ...rest }) => {
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
    amountValue: undefined,
    fiatValue: '$-',
    invalid: false,
    invalidText: undefined,
    isInputLoading: true
  });

  const handleInputChange = (value: string, selectedToken: SwapDataType) => {
    if (!value) {
      updateInputEvent({
        type: SwapValueType.NOVALUE,
        amountValue: '0',
        fiatValue: '$-',
        invalid: true,
        invalidText: 'Please enter a value.'
      });
    }
    if (value) {
      const decimalInput = new Decimal(value);
      const decimalDefault = new Decimal(selectedToken.amountValue);
      if (!decimalInput.isPositive()) {
        updateInputEvent({
          type: SwapValueType.NOTPOSITIVE,
          amountValue: selectedToken.amountValue,
          fiatValue: selectedToken.fiatValue,
          invalid: true,
          invalidText: 'Please enter a positive value.'
        });
      }
      if (decimalInput.toNumber() > decimalDefault.toNumber()) {
        updateInputEvent({
          type: SwapValueType.OVERMAXIMUM,
          amountValue: selectedToken.amountValue,
          fiatValue: selectedToken.fiatValue,
          invalid: true,
          invalidText: `Please enter a value less than ${selectedToken.amountValue}.`
        });
      }
      if (
        !(decimalInput.toNumber() > decimalDefault.toNumber()) &&
        decimalInput.isPositive()
      ) {
        updateInputEvent({
          type: SwapValueType.VALID,
          amountValue: value,
          fiatValue: decimalInput.div(0.05).toString(),
          invalid: false,
          invalidText: undefined
        });
      }
    }
  };
  const handleFromDropdownChange: handleSwapDropdown = (value) => {
    if (value) {
      updateInputEvent({
        type: SwapValueType.UPDATE,
        isInputLoading: false,
        invalid: false,
        amountValue: value.amountValue,
        fiatValue: value.fiatValue
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
        isInputLoading: false,
        invalid: false,
        amountValue: toToken.selectedToken.amountValue,
        fiatValue: toToken.selectedToken.fiatValue
      });
  }, [fromToken.selectedToken, toToken.selectedToken]);

  useEffect(() => {
    const formatData = chainList.map(
      ({ chainName, label, value, symbol, icon, amountValue, fiatValue }) => ({
        name: chainName,
        label,
        value,
        symbol,
        icon,
        amountValue,
        fiatValue
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
        isInputLoading: false,
        invalid: false,
        amountValue: chainData[0].amountValue,
        fiatValue: chainData[0].fiatValue
      });
    }
  }, [chainData]);

  return (
    <Box py={16}>
      <Box maxW="md" mx="auto">
        <SwapDropdownsView
          dropdownData={chainData}
          fromDropdownLoading={fromToken.dropdownLoading}
          fromInputLoading={inputEvent.isInputLoading}
          fromToken={fromToken.selectedToken}
          toDropdownLoading={toToken.dropdownLoading}
          toInputLoading={toToken.inputLoading}
          toToken={toToken.selectedToken}
          amountValue={inputEvent.amountValue}
          fiatValue={inputEvent.fiatValue}
          invalid={inputEvent.invalid}
          invalidText={inputEvent.invalidText}
          onAmountInputChange={(value) => {
            if (fromToken.selectedToken)
              handleInputChange(value, fromToken.selectedToken);
          }}
          onFromDropdownChange={handleFromDropdownChange}
          onToDropdownChange={handleToDropdownChange}
          onSwapSwitch={handleSwapSwitch}
        />
      </Box>
    </Box>
  );
};

export const swapDropdownsView = Template.bind({});

// to hide controls
swapDropdownsView.parameters = {
  controls: {
    include: ['onDropdownChange']
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
            Swap Dropdowns view
          </Text>
          <Primary />
          <ArgsTable of={SwapDropdownsView} />
        </>
      )
    }
  },
  argTypes: {
    onChange: {
      control: false,
      action: 'selected'
    }
  }
} as ComponentMeta<typeof SwapDropdownsView>;
