import { Box } from '@chakra-ui/react';
import { ConnectWalletButton } from '@cosmology-ui/react';
import { ComponentStory } from '@storybook/react';
import React from 'react';

export const ConnectWalletButtonStory: ComponentStory<
  typeof ConnectWalletButton
> = (args) => {
  return (
    <Box mx="auto" maxW={48} py={16}>
      <ConnectWalletButton {...args} />
    </Box>
  );
};

ConnectWalletButtonStory.args = {
  buttonText: 'Connect Wallet',
  loading: false,
  disabled: false,
  className: 'connect-wallet-button'
};

ConnectWalletButtonStory.argTypes = {
  buttonText: {
    control: {
      type: 'text'
    }
  },
  loading: {
    control: { type: 'radio' },
    options: [true, false]
  },
  disabled: {
    control: { type: 'radio' },
    options: [true, false]
  },
  leftIcon: { control: false },
  rightIcon: { control: false },
  className: {
    control: {
      type: 'text'
    }
  },
  onClick: { control: false }
};

ConnectWalletButtonStory.storyName = 'Connect Wallet Button';
