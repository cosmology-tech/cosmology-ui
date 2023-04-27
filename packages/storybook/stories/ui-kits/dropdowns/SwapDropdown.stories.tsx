/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  SwapDropdown,
  SwapOptionType
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { chainList } from '../../util/config';

const Template: ComponentStory<typeof SwapDropdown> = (arg) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [demoSelectedToken, setDemoSelectedToken] = useState<SwapOptionType>();
  const [chainData, setChainData] = useState<SwapOptionType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnChange: handleSwapDropdown = (value) => {
    console.log('selected', value);
    if (value) setDemoSelectedToken(value);
    if (!value) setDemoSelectedToken(chainData[0]);
  };

  useEffect(() => {
    const formatData = chainList.map(
      ({ label, symbol, icon, denom, amount, dollarValue }) => ({
        value: denom,
        symbol,
        icon,
        denom,
        amount: amount,
        displayAmount: amount,
        dollarValue,
        chainName: label
      })
    );
    setTimeout(() => {
      setChainData(formatData);
    }, 800);
  }, []);

  useEffect(() => {
    if (chainData.length > 0 && loading) {
      setLoading(false);
      if (chainData) setDemoSelectedToken(chainData[0]);
    }
  }, [chainData, loading]);

  return (
    <Box py={16}>
      <Box mx="auto" w="fit-content">
        <Button id="swap-control-dropdown-button" onClick={onOpen}>
          Open dropdown
        </Button>
      </Box>
      <Box maxW="md" mx="auto">
        <SwapDropdown
          {...arg}
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
