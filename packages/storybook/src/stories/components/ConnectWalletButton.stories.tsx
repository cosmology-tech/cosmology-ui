import { BaseButtonType, Box, ConnectWalletButton } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { Story } from '@storybook/react';
import React from 'react';

const Template: Story<BaseButtonType> = ({
  loading,
  disabled,
  onClick,
  ...rest
}: BaseButtonType) => {
  return (
    <Box display="flex" justifyContent="center" py="$16">
      <ConnectWalletButton
        buttonText="Connect Wallet"
        loading={loading}
        disabled={disabled}
        onClick={onClick}
      />
    </Box>
  );
};

export const connectWalletButton = Template.bind({});

// to hide controls
connectWalletButton.parameters = {
  controls: {
    include: [
      'buttonText',
      'loading',
      'disabled',
      'leftIcon',
      'rightIcon',
      'onClick'
    ]
  }
};

export default {
  title: 'Components/buttons',
  component: ConnectWalletButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>Connect Wallet Button</h1>
          <Primary />
          <ArgsTable of={ConnectWalletButton} />
        </>
      ),
      source: {
        code: `import { ConnectWalletButton } from '@cosmology-ui/react';\n\n<ConnectWalletButton\n  \n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    loading: true,
    disabled: false,
    buttonText: '',
    leftIcon: undefined,
    rightIcon: undefined
  },
  argTypes: {
    // status: { options: WalletStatus, control: { type: 'radio' } },
    onClick: {
      control: false,
      action: 'clicked'
    }
  }
};
