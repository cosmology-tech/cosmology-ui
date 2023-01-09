import { Box, Text, useColorMode } from '@chakra-ui/react';
import {
  DownloadInfo,
  InstallWalletButton as InstallWalletButtonKit
} from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import Bowser from 'bowser';
import React, { useEffect, useState } from 'react';
import { HiDownload } from 'react-icons/hi';

import { handleDevice } from '../../util/config';

const Template: ComponentStory<typeof InstallWalletButtonKit> = ({
  ...args
}) => {
  const { colorMode } = useColorMode();
  const [currentTheme, setCurrentTheme] = useState<string>(colorMode);
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
    setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');

    window.addEventListener('storage', () => {
      setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');
    });
  }, []);

  return (
    <Box maxW={60} mx="auto" py={16}>
      <InstallWalletButtonKit
        icon={
          typeof userBrowserInfo === 'string'
            ? HiDownload
            : userBrowserInfo?.icon
        }
        theme={currentTheme}
        {...args}
      />
    </Box>
  );
};

export const InstallWalletButton = Template.bind({});

// to hide controls
InstallWalletButton.parameters = {
  controls: {
    exclude: ['icon', 'styleProps', 'theme', 'className']
  }
};

export default {
  title: 'Components/Buttons',
  component: InstallWalletButtonKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Install Wallet Button
          </Text>
          <Primary />
          <ArgsTable of={InstallWalletButtonKit} />
        </>
      ),
      source: {
        code: `import { InstallWalletButton } from '@cosmology-ui/utils';\n\n<InstallWalletButton\n  buttonText="Install Wallet"\n  disabled={false}\n  icon={<Icon />}\n  className="the class name of install wallet button"\n  theme={currentTheme}\n  styleProps={objectOfCustomInstallWalletButtonStyle}\n  onClick={linkFunction}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    buttonText: 'Install Keplr',
    disabled: false
  },
  argTypes: {
    onClick: {
      control: false,
      action: 'clicked'
    }
  }
};
