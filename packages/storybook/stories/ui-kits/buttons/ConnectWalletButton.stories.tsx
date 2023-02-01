import { Box, Icon, Text } from '@chakra-ui/react';
import {
  BaseButtonType,
  ConnectWalletButton,
  WalletStatus
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import {
  RiDeviceLine,
  RiDoorOpenFill,
  RiRepeatLine,
  RiShuffleFill
} from 'react-icons/ri';

interface TypeWithStatus extends BaseButtonType {
  status: WalletStatus;
}

function handleStatus(status: WalletStatus) {
  switch (status) {
    case WalletStatus.Disconnected:
      return {
        buttonText: 'Connect Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: undefined,
        rightIcon: undefined
      };
    case WalletStatus.NotExist:
      return {
        buttonText: 'Installed Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={RiDeviceLine} />,
        rightIcon: undefined
      };
    case WalletStatus.Connecting:
      return {
        buttonText: undefined,
        isLoading: true,
        isDisabled: false,
        leftIcon: false,
        rightIcon: undefined
      };
    case WalletStatus.Connected:
      return {
        buttonText: 'Disconnected',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={RiDoorOpenFill} />,
        rightIcon: undefined
      };
    case WalletStatus.Rejected:
      return {
        buttonText: 'Reconnect',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={RiRepeatLine} />,
        rightIcon: undefined
      };
    case WalletStatus.Error:
      return {
        buttonText: 'Change Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={RiShuffleFill} />,
        rightIcon: undefined
      };

    default:
      return {
        buttonText: 'Connect Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: undefined,
        rightIcon: undefined
      };
  }
}

// eslint-disable-next-line react/prop-types
const Template: Story<TypeWithStatus> = ({ status, ...rest }) => {
  const currentStatus = handleStatus(status);

  return (
    <Box maxW={52} mx="auto" py={16}>
      <ConnectWalletButton
        buttonText={currentStatus.buttonText}
        disabled={currentStatus.isDisabled}
        loading={currentStatus.isLoading}
        leftIcon={currentStatus.leftIcon}
        rightIcon={currentStatus.rightIcon}
        {...rest}
      />
    </Box>
  );
};

export const connectWalletButton = Template.bind({});

// to hide controls
connectWalletButton.parameters = {
  controls: {
    include: ['status', 'onClick']
  }
};

export default {
  title: 'Components/Buttons',
  component: ConnectWalletButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Wallet Button
          </Text>
          <Primary />
          <ArgsTable of={ConnectWalletButton} />
        </>
      ),
      source: {
        code: `import { ConnectWalletButton } from '@cosmology-ui/react';\n\n<ConnectWalletButton\n  buttonText="Connect Wallet"\n  loading={false}\n  disabled={false}\n  leftIcon={<Icon />}\n  rightIcon={<Icon />}\n  className="the class name of connect wallet button"\n  styleProps={objectOfCustomConnectWalletButtonStyle}\n  onClick={clickFunction}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  argTypes: {
    status: { options: WalletStatus, control: { type: 'radio' } },
    onClick: {
      control: false,
      action: 'clicked'
    }
  }
} as ComponentMeta<typeof ConnectWalletButton>;
