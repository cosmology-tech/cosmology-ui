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
  ConnectModalWalletList,
  Wallet
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { Story } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

import { cosmostationData, keplrData, WalletData } from '../../util/config';

interface TypeWithStatus extends Wallet {
  wallet: string;
  signal: boolean;
}

const Template: Story<TypeWithStatus> = ({ wallet, signal }) => {
  const { colorMode } = useColorMode();
  const initialFocus = useRef<HTMLButtonElement>(null);
  const [data, setData] = useState<Wallet[]>(WalletData);
  const display = useBreakpointValue({ base: 'mobile', md: 'desktop' });

  useEffect(() => {
    switch (wallet) {
      case 'Keplr': {
        const format = keplrData.filter(({ buttonShape, mobileDisabled }) => {
          if (display === 'desktop') {
            if (buttonShape === ButtonShape.Square) return true;
            if (buttonShape === ButtonShape.Rectangle) return false;
            if (mobileDisabled) return false;
          }
          if (display !== 'desktop') {
            if (buttonShape === ButtonShape.Square) return false;
            if (buttonShape === ButtonShape.Rectangle) return true;
            if (mobileDisabled) return true;
          }
        });
        if (signal) setData(keplrData.slice(0, 1));
        if (!signal) setData(format);
        break;
      }
      case 'Cosmostation': {
        const format = cosmostationData.filter(
          ({ buttonShape, mobileDisabled }) => {
            if (display === 'desktop') {
              if (buttonShape === ButtonShape.Square) return true;
              if (buttonShape === ButtonShape.Rectangle) return false;
              if (mobileDisabled) return false;
            }
            if (display !== 'desktop') {
              if (buttonShape === ButtonShape.Square) return false;
              if (buttonShape === ButtonShape.Rectangle) return true;
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
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        pb={6}
        border="1px solid"
        borderColor={colorMode === 'light' ? 'gray.300' : 'whiteAlpha.300'}
        borderRadius="lg"
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        overflow="hidden"
      >
        <Box w="full" p={6}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <ConnectModalWalletList
          walletsData={data}
          initialFocus={initialFocus}
        />
      </Box>
    </Center>
  );
};

export const connectModalWalletList = Template.bind({});

// to hide controls
connectModalWalletList.parameters = {
  controls: {
    include: ['signal', 'wallet']
  }
};

export default {
  title: 'Components/Modals/ConnectModal',
  component: ConnectModalWalletList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Modal Wallet List
          </Text>
          <Primary />
          <ArgsTable of={ConnectModalWalletList} />
        </>
      ),
      source: {
        code: `import { ConnectModalWalletList } from '@cosmology-ui/react';\n\n<ConnectModalWalletList\n  initialFocus={buttonRef}\n  walletsData={[wallets]}\n  className="the class name of wallet list"\n  styleProps={objectOfCustomListStyle}\n  shadowAnimateProps={objectOfCustomShadowAnimate}\n/>`,
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
