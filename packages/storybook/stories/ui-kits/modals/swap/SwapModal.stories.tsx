/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Center, Text, useDisclosure } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  SwapOptionDataType,
  SwapModal
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
  selectedToken?: SwapOptionDataType;
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

const Template: ComponentStory<typeof SwapModal> = ({
  tokenArray,
  submitDisabled,
  submitLoading,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chainData, setChainData] = useState<SwapOptionDataType[]>([]);
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
  const [selectedToken, setSelectToken] = useState<string | undefined>(
    tokenArray ? tokenArray[0] : undefined
  );
  const [priceValue, setPrice] = useState({
    loading: true,
    rate: {
      fromValue: '0',
      toValue: '0',
      dollarValue: '$-'
    }
  });

  const handleSelectTolerance = (value: string) => {
    console.log(`log:tolerance`, value);
    setSelectToken(value);
  };
  const handleInputChange = (
    value: string,
    selectedToken: SwapOptionDataType
  ) => {
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
      const decimalDefault = new Decimal(selectedToken.balanceDisplayAmount);
      if (!decimalInput.isPositive()) {
        updateInputEvent({
          type: SwapValueType.NOTPOSITIVE,
          inputAmount: selectedToken.balanceDisplayAmount,
          inputDollarValue: selectedToken.dollarValue,
          invalid: true,
          invalidText: 'Please enter a positive value.'
        });
      }
      if (decimalInput.toNumber() > decimalDefault.toNumber()) {
        updateInputEvent({
          type: SwapValueType.OVERMAXIMUM,
          inputAmount: selectedToken.balanceDisplayAmount,
          inputDollarValue: selectedToken.dollarValue,
          invalid: true,
          invalidText: `Please enter a value less than ${selectedToken.balanceDisplayAmount}.`
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
              currentAmount: toToken.selectedToken.balanceDisplayAmount
            },
            dropdownLoading: false,
            inputLoading: false
          });
        }
      }
      if (!decimalDefault.eq(decimalInput)) {
        if (toToken.selectedToken) {
          const fromAmount = new Decimal(selectedToken.balanceDisplayAmount);
          const toDecimal = new Decimal(
            toToken.selectedToken.balanceDisplayAmount
          );
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
        inputAmount: value.balanceDisplayAmount,
        inputDollarValue: value.dollarValue
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
        inputAmount: toToken.selectedToken.balanceDisplayAmount,
        inputDollarValue: toToken.selectedToken.dollarValue
      });
  }, [fromToken.selectedToken, toToken.selectedToken]);
  const handleSubmit = () => {
    console.log('submit');
  };

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
  useEffect(() => {
    if (fromToken.selectedToken && toToken.selectedToken) {
      const decimalValue = new Decimal(
        fromToken.selectedToken.balanceDisplayAmount
      );
      setPrice({
        loading: false,
        rate: {
          fromValue: '1',
          toValue: decimalValue
            .mul(toToken.selectedToken.balanceDisplayAmount)
            .div(decimalValue)
            .div(100)
            .toFixed(5),
          dollarValue:
            '$' +
            decimalValue
              .div(toToken.selectedToken.balanceDisplayAmount)
              .mul(100)
              .toFixed(4)
        }
      });
    }
  }, [fromToken.selectedToken, toToken.selectedToken]);

  return (
    <Box py={16}>
      <Box maxW="md" mx="auto">
        <Center>
          <Button onClick={onOpen}>open modal</Button>
        </Center>
        <SwapModal
          isOpen={isOpen}
          dropdownData={chainData}
          fromDropdownLoading={fromToken.dropdownLoading}
          fromInputLoading={inputEvent.inputLoading}
          fromToken={fromToken.selectedToken}
          toDropdownLoading={toToken.dropdownLoading}
          toInputLoading={toToken.inputLoading}
          toToken={toToken.selectedToken}
          inputAmount={inputEvent.inputAmount}
          inputDollarValue={inputEvent.inputDollarValue}
          settingToken={selectedToken}
          tokenArray={tokenArray}
          priceValue={priceValue}
          submitLoading={submitLoading}
          submitDisabled={submitDisabled}
          onClose={onClose}
          onSelectSetting={handleSelectTolerance}
          onAmountInputChange={(value) => {
            if (fromToken.selectedToken)
              handleInputChange(value, fromToken.selectedToken);
          }}
          onFromDropdownChange={handleFromDropdownChange}
          onToDropdownChange={handleToDropdownChange}
          onSwapSwitch={handleSwapSwitch}
          onSwapSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export const swapModal = Template.bind({});

// to hide controls
swapModal.parameters = {
  controls: {
    include: [
      'tokenArray',
      'submitLoading',
      'submitDisabled',
      'onDropdownChange'
    ]
  }
};

export default {
  title: 'Components/Modals/Swap',
  component: SwapModal,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Swap Modal
          </Text>
          <Primary />
          <ArgsTable of={SwapModal} />
        </>
      )
    }
  },
  args: {
    tokenArray: ['1%', '2.5%', '3%', '5%'],
    submitDisabled: false,
    submitLoading: false
  },
  argTypes: {
    onChange: {
      control: false,
      action: 'selected'
    }
  }
} as ComponentMeta<typeof SwapModal>;
