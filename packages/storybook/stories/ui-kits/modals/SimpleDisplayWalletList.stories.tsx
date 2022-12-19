/* eslint-disable react/prop-types */
import {
  Box,
  Center,
  Text,
  useBreakpointValue,
  useColorMode
} from '@chakra-ui/react';
import {
  ButtonShape,
  handleChangeColorModeValue,
  SimpleDisplayWalletList as SimpleDisplayWalletListKit,
  Wallet
} from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { Story } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

import { cosmostationData, keplrData, WalletData } from '../../util/config';

interface TypeWithStatus extends Wallet {
  wallet: string;
  signal: boolean;
}

const Template: Story<TypeWithStatus> = ({ wallet, signal }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const initialFocus = useRef<HTMLButtonElement>(null);
  const [data, setData] = useState<Wallet[]>(WalletData);
  const display = useBreakpointValue({ base: 'mobile', md: 'desktop' });

  useEffect(() => {
    switch (wallet) {
      case 'Keplr': {
        const format = keplrData.filter(({ modalListType, mobileDisabled }) => {
          if (display === 'desktop') {
            if (modalListType === ButtonShape.Square) return true;
            if (modalListType === ButtonShape.Rectangle) return false;
            if (mobileDisabled) return false;
          }
          if (display !== 'desktop') {
            if (modalListType === ButtonShape.Square) return false;
            if (modalListType === ButtonShape.Rectangle) return true;
            if (mobileDisabled) return true;
          }
        });
        if (signal) setData(keplrData.slice(0, 1));
        if (!signal) setData(format);
        break;
      }
      case 'Cosmostation': {
        const format = cosmostationData.filter(
          ({ modalListType, mobileDisabled }) => {
            if (display === 'desktop') {
              if (modalListType === ButtonShape.Square) return true;
              if (modalListType === ButtonShape.Rectangle) return false;
              if (mobileDisabled) return false;
            }
            if (display !== 'desktop') {
              if (modalListType === ButtonShape.Square) return false;
              if (modalListType === ButtonShape.Rectangle) return true;
              if (mobileDisabled) return true;
            }
          }
        );
        if (signal) setData(cosmostationData.slice(1, 2));
        if (!signal) setData(format);
        break;
      }
      default:
        setData(WalletData);
        break;
    }
  }, [wallet, display, signal]);

  return (
    <Center ref={divRef} py={16}>
      <Box
        w="full"
        maxW={80}
        pb={6}
        border="1px solid"
        borderColor={handleChangeColorModeValue(
          colorMode,
          'gray.300',
          'whiteAlpha.300'
        )}
        borderRadius="lg"
        bg={handleChangeColorModeValue(colorMode, 'white', 'gray.700')}
        overflow="hidden"
      >
        <Box w="full" p={6}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <SimpleDisplayWalletListKit
          walletsData={data}
          initialFocus={initialFocus}
        />
      </Box>
    </Center>
  );
};

export const SimpleDisplayWalletList = Template.bind({});

// to hide controls
SimpleDisplayWalletList.parameters = {
  controls: {
    exclude: ['initialFocus', 'walletsData']
  }
};

export default {
  title: 'Components/Modals',
  component: SimpleDisplayWalletListKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple Display Wallet List
          </Text>
          <Primary />
          <ArgsTable of={SimpleDisplayWalletListKit} />
        </>
      ),
      source: {
        code: `import { SimpleDisplayWalletList } from '@cosmology-ui/utils';\n\n<SimpleDisplayWalletListKit\n  initialFocus={ref}\n  walletData={[walletList]}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  argTypes: {
    signal: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    wallet: {
      options: ['Keplr', 'Cosmostation'],
      defaultValue: 'Keplr',
      control: { type: 'radio' }
    }
  }
};
