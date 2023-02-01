import { Box, Icon, Text } from '@chakra-ui/react';
import { DownloadInfo, InstallWalletButton } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import Bowser from 'bowser';
import React, { useEffect, useState } from 'react';
import { TbCloudDownload } from 'react-icons/tb';

import { WalletData } from '../../util/config';
import { UserDeviceInfoType } from '../../util/types';

function handleDevice({ browser, device, os }: UserDeviceInfoType) {
  switch (device) {
    case 'desktop':
      return WalletData[0].downloads.desktop.find(
        (key) => key.browser === browser
      );
    case 'tablet':
      return WalletData[0].downloads.tablet.find((key) => key.os === os);
    case 'mobile':
      return WalletData[0].downloads.mobile.find((key) => key.os === os);
    default:
      return WalletData[0].downloads.default;
  }
}

const Template: ComponentStory<typeof InstallWalletButton> = ({ ...rest }) => {
  const [userBrowserInfo, setUserBrowserInfo] = useState<
    DownloadInfo | string | undefined
  >();

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const info = {
      browser: browser.getBrowserName(true),
      device: browser.getPlatformType(true),
      os: browser.getOSName(true)
    };

    setUserBrowserInfo(handleDevice(info));
  }, []);

  return (
    <Box maxW={60} mx="auto" py={16}>
      <InstallWalletButton
        leftIcon={
          <Icon
            as={
              typeof userBrowserInfo === 'string' ||
              typeof userBrowserInfo === 'undefined'
                ? TbCloudDownload
                : userBrowserInfo?.icon
            }
          />
        }
        {...rest}
      />
    </Box>
  );
};

export const installWalletButton = Template.bind({});

// to hide controls
installWalletButton.parameters = {
  controls: {
    exclude: ['leftIcon', 'rightIcon', 'styleProps', 'theme', 'className']
  }
};

export default {
  title: 'Components/Buttons',
  component: InstallWalletButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Install Wallet Button
          </Text>
          <Primary />
          <ArgsTable of={InstallWalletButton} />
        </>
      ),
      source: {
        code: `import { InstallWalletButton } from '@cosmology-ui/react';\n\n<InstallWalletButton\n  buttonText="Install Wallet"\n  loading={false}\n  disabled={false}\n  leftIcon={<Icon />}\n  rightIcon={<Icon />}\n  className="the class name of install wallet button"\n  styleProps={objectOfCustomInstallWalletButtonStyle}\n  onClick={clickFunction}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    buttonText: 'Install Keplr',
    disabled: false,
    loading: false
  },
  argTypes: {
    onClick: {
      control: false,
      action: 'clicked'
    }
  }
};
