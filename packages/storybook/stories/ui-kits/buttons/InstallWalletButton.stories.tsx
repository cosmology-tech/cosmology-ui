import { Box, Text } from '@chakra-ui/react';
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
    <Box maxW={80} mx="auto" py={16}>
      <InstallWalletButtonKit
        icon={
          typeof userBrowserInfo === 'string'
            ? HiDownload
            : userBrowserInfo?.icon
        }
        {...args}
      />
    </Box>
  );
};

export const InstallWalletButton = Template.bind({});

// to hide controls
InstallWalletButton.parameters = {
  controls: {
    exclude: ['icon']
  }
};

export default {
  title: 'UIKits/Buttons',
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
        code: `import { InstallWalletButton } from '@cosmology-ui/utils';\n\n<InstallWalletButton\n  buttonText="Install Wallet"\n  disabled={false}\n  icon={<Icon />}\n  onClick={linkFunction}\n/>`,
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
