import { Box, Button, useDisclosure } from '@chakra-ui/react';
import {
  handleSwapDropdown,
  SwapDataType,
  SwapDropdown
} from '@cosmology-ui/react';
import { useEffect, useState } from 'react';

import { chainList } from '../../stories/util/config';

export const SwapDropdownDemo = () => {
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
