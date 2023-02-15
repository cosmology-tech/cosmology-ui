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
    dropdownLoading: action.dropdownLoading
  };
}
function updateInputReducer(
  state: UpdateInputReducer,
  action: UpdateReducerAction
): UpdateInputReducer {
  switch (action.type) {
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

  const handleOnChange: handleSwapDropdown = (value) => {
    console.log('selected', value);
    if (value) {
      updateInputEvent({
        type: SwapValueType.UPDATE,
        isInputLoading: false,
        invalid: false,
        amountValue: value.amountValue,
        fiatValue: value.fiatValue
      });
      updateDropdownEvent({
        selectedToken: value
      });
    }
  };

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
      updateDropdownEvent({
        selectedToken: formatData[0],
        dropdownLoading: false
      });
      updateInputEvent({
        type: SwapValueType.UPDATE,
        isInputLoading: false,
        invalid: false,
        amountValue: formatData[0].amountValue,
        fiatValue: formatData[0].fiatValue
      });
    }, 100);
  }, []);

  return (
    <Box py={16}>
      <Box maxW="lg" mx="auto" px={8}>
        <SwapControlPanel
          swapType={swapType}
          dropdownLoading={dropdownEvent.dropdownLoading}
          inputLoading={inputEvent.isInputLoading}
          dropdownData={chainData}
          selectedToken={dropdownEvent.selectedToken}
          invalid={inputEvent.invalid}
          invalidText={inputEvent.invalidText}
          inputControlPanel={swapType === SwapType.from ? true : false}
          amountValue={inputEvent.amountValue}
          fiatValue={inputEvent.fiatValue}
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
