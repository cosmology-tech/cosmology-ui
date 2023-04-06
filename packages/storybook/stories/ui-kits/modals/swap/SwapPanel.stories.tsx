/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Text } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  SwapControlPanel,
  SwapDataType,
  SwapType
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Decimal from 'decimal.js';
import React, { useEffect, useReducer, useState } from 'react';

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
    dropdownLoading: action.dropdownLoading
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

const Template: ComponentStory<typeof SwapControlPanel> = ({ swapType }) => {
  const [chainData, setChainData] = useState<SwapDataType[]>([]);
  const [dropdownEvent, updateDropdownEvent] = useReducer(
    updateDropdownReducer,
    {
      selectedToken: undefined,
      dropdownLoading: true
    }
  );
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
    }
  };

  const handleOnChange: handleSwapDropdown = (value) => {
    console.log('selected', value);
    if (value) {
      updateInputEvent({
        type: SwapValueType.UPDATE,
        inputLoading: false,
        invalid: false,
        inputAmount: value.currentAmount,
        inputDollarValue: value.currentDollarValue
      });
      updateDropdownEvent({
        selectedToken: value
      });
    }
  };

  useEffect(() => {
    const formatData = chainList.map(
      ({ chainName, label, value, symbol, icon, amount, dollarValue }) => ({
        name: chainName,
        label,
        value,
        symbol,
        icon,
        amount,
        dollarValue,
        currentAmount: amount,
        currentDollarValue: dollarValue
      })
    );

    setTimeout(() => {
      setChainData(formatData);
      updateDropdownEvent({
        selectedToken: formatData[0],
        dropdownLoading: false
      });
      updateInputEvent({
        type: SwapValueType.INITIAL,
        inputLoading: false,
        invalid: false,
        inputAmount: formatData[0].currentAmount,
        inputDollarValue: formatData[0].currentDollarValue
      });
    }, 100);
  }, []);

  return (
    <Box py={16}>
      <Box maxW="lg" mx="auto" px={8}>
        <SwapControlPanel
          swapType={swapType}
          dropdownLoading={dropdownEvent.dropdownLoading}
          inputLoading={inputEvent.inputLoading}
          dropdownData={chainData}
          selectedToken={dropdownEvent.selectedToken}
          invalid={inputEvent.invalid}
          invalidText={inputEvent.invalidText}
          inputControlPanel={swapType === SwapType.from ? true : false}
          inputAmount={inputEvent.inputAmount}
          inputDollarValue={inputEvent.inputDollarValue}
          onAmountInputChange={(value) => {
            if (dropdownEvent.selectedToken)
              handleInputChange(value, dropdownEvent.selectedToken);
          }}
          onDropdownChange={handleOnChange}
        />
      </Box>
    </Box>
  );
};

export const swapControlPanel = Template.bind({});

swapControlPanel.parameters = {
  controls: {
    include: [
      'swapType',
      'onDropdownChange',
      'onAmountInputChange',
      'onFiatInputChange'
    ]
  }
};

export default {
  title: 'Components/Modals/Swap',
  component: SwapControlPanel,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Swap Panel
          </Text>
          <Primary />
          <ArgsTable of={SwapControlPanel} />
        </>
      )
    }
  },
  argTypes: {
    swapType: {
      control: { type: 'radio' },
      options: SwapType,
      defaultValue: SwapType.from
    },
    onAmountInputChange: {
      control: false,
      action: 'amount-value'
    },
    onFiatInputChange: {
      control: false,
      action: 'amount-value'
    },
    onDropdownChange: {
      control: false,
      action: 'selected'
    }
  }
} as ComponentMeta<typeof SwapControlPanel>;
