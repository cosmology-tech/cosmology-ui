import { Box, Icon, Text, useColorMode } from '@chakra-ui/react';
import {
  ConnectWalletButton as ConnectWalletButtonKit,
  ConnectWalletButtonType,
  WalletStatus
} from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, Story } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import {
  RiDeviceLine,
  RiDoorOpenFill,
  RiRepeatLine,
  RiShuffleFill
} from 'react-icons/ri';

interface TypeWithStatus extends ConnectWalletButtonType {
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
  const { colorMode } = useColorMode();
  const currentStatus = handleStatus(status);
  const [currentTheme, setCurrentTheme] = useState<string>(colorMode);

  useEffect(() => {
    setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');

    window.addEventListener('storage', () => {
      setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');
    });
  }, []);

  return (
    <Box maxW={52} mx="auto" py={16}>
      <ConnectWalletButtonKit
        buttonText={currentStatus.buttonText}
        disabled={currentStatus.isDisabled}
        loading={currentStatus.isLoading}
        leftIcon={currentStatus.leftIcon}
        rightIcon={currentStatus.rightIcon}
        theme={currentTheme}
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
  title: 'Components/Buttons',
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
        code: `import { ConnectWalletButton } from '@cosmology-ui/utils';\n\n<ConnectWalletButton\n  buttonText="Connect Wallet"\n  loading={false}\n  disabled={false}\n  leftIcon={<Icon />}\n  rightIcon={<Icon />}\n  className="the class name of connect wallet button"\n  theme={currentTheme}\n  styleProps={objectOfCustomConnectWalletButtonStyle}\n  onClick={clickFunction}\n/>`,
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
