import { Box, Icon, Text } from '@chakra-ui/react';
import {
  ConnectWalletButton as ConnectWalletButtonKit,
  ConnectWalletType,
  WalletStatus
} from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import {
  RiDeviceLine,
  RiDoorOpenFill,
  RiRepeatLine,
  RiShuffleFill
} from 'react-icons/ri';

interface TypeWithStatus extends ConnectWalletType {
  status: WalletStatus;
}

function handleStatus(status: WalletStatus) {
  switch (status) {
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
      <ConnectWalletButtonKit
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

export const ConnectWalletButton = Template.bind({});

// to hide controls
ConnectWalletButton.parameters = {
  controls: {
    include: ['status', 'onClickConnectBtn']
  }
};

export default {
  title: 'Cosmos/kits',
  component: ConnectWalletButtonKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Wallet Button
          </Text>
          <Primary />
          <ArgsTable of={ConnectWalletButtonKit} />
        </>
      ),
      source: {
        code: `<ConnectWalletButton\n  buttonText="connect wallet"\n  loading={true|false}\n  disabled={true|false}\n  leftIcon={<Icon />}\n  rightIcon={<Icon />}\n  onClick={clickFunction}\n/>`,
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
} as ComponentMeta<typeof ConnectWalletButtonKit>;
