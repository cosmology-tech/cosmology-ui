/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  SwapDataType,
  SwapDropdown
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { chainList } from '../../util/config';

const Template: ComponentStory<typeof SwapDropdown> = ({
  onDropdownChange,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [demoSelectedToken, setDemoSelectedToken] = useState<SwapDataType>();
  const [chainData, setChainData] = useState<SwapDataType[]>([]);

  const handleOnChange: handleSwapDropdown = (value) => {
    console.log('selected', value);
    if (value) setDemoSelectedToken(value);
    if (!value) setDemoSelectedToken(chainData[0]);
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
      setChainData([
        {
          value: 'disabled',
          symbol: 'disabled',
          icon: {
            png: 'https://dummyimage.com/400x400/5c5c5c/ffffff.png&text=D'
          },
          denom:
            'ibc/4A3AAD07BC4EBEBC10FC2560EAA3B7A1D3B541B5264ED8E5E13E6B74AC76127B',
          amount: '0',
          dollarValue: '$0',
          currentAmount: '0',
          currentDollarValue: '$0',
          disabled: true
        },
        ...formatData
      ]);
    }, 800);

    if (formatData) setDemoSelectedToken(formatData[0]);
  }, []);

  return (
    <Box py={16}>
      <Box mx="auto" w="fit-content">
        <Button id="swap-control-dropdown-button" onClick={onOpen}>
          Open dropdown
        </Button>
      </Box>
      <Box maxW="md" mx="auto">
        <SwapDropdown
          isOpen={isOpen}
          onClose={onClose}
          dropdownData={chainData}
          selectedToken={demoSelectedToken}
          onDropdownChange={handleOnChange}
        />
      </Box>
    </Box>
  );
};

export const swapDropdown = Template.bind({});

// to hide controls
swapDropdown.parameters = {
  controls: {
    include: []
  }
};

export default {
  title: 'Components/Dropdowns',
  component: SwapDropdown,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Swap Dropdown
          </Text>
          <Primary />
          <ArgsTable of={SwapDropdown} />
        </>
      )
    }
  }
} as ComponentMeta<typeof SwapDropdown>;
