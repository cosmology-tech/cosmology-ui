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
      setChainData([
        {
          name: 'disabled',
          label: 'disabled',
          value: 'disabled',
          symbol: 'disabled',
          icon: {
            png: 'https://dummyimage.com/400x400/5c5c5c/ffffff.png&text=D'
          },
          amountValue: '0',
          fiatValue: '$0',
          disabled: true
        },
        ...formatData
      ]);
    }, 800);

    setDemoSelectedToken(formatData[0]);
  }, []);

  return (
    <Box py={16}>
      <Box mx="auto" w="fit-content">
        <Button onClick={onOpen}>Open dropdown</Button>
      </Box>
      <Box maxW="md" mx="auto">
        <SwapDropdown
          isOpen={isOpen}
          onClose={onClose}
          dropdownData={chainData}
          selectedToken={demoSelectedToken}
          onDropdownChange={handleOnChange}
          // {...rest}
        />
      </Box>
    </Box>
  );
};

export const swapDropdown = Template.bind({});

// to hide controls
swapDropdown.parameters = {
  controls: {
    include: ['onDropdownChange']
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
  },
  argTypes: {
    onChange: {
      control: false,
      action: 'selected'
    }
  }
} as ComponentMeta<typeof SwapDropdown>;
