import { Box, Text } from '@chakra-ui/react';
import {
  DownloadInfo,
  InstallWalletButton as InstallWalletButtonKit
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import Bowser from 'bowser';
import React, { useEffect, useState } from 'react';
import { HiDownload } from 'react-icons/hi';

import { handleDevice } from '../../util/config';

const Template: ComponentStory<typeof InstallWalletButtonKit> = ({
  icon,
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
    <Box maxW={60} mx="auto" py={16}>
      <InstallWalletButtonKit
        icon={
          icon === 'string'
            ? 'https://dummyimage.com/400x400/b535b5/ffffff.jpg&text=▼'
            : typeof userBrowserInfo === 'string'
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
    exclude: ['styleProps', 'theme', 'className']
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
        code: `import { InstallWalletButton } from '@cosmology-ui/utils';\n\n<InstallWalletButton\n  buttonText="Install Wallet"\n  disabled={false}\n  icon={<Icon />}\n  className="the class name of install wallet button"\n  styleProps={objectOfCustomInstallWalletButtonStyle}\n  onClick={linkFunction}\n/>`,
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
    icon: {
      defaultValue: 'svg',
      options: ['svg', 'string'],
      control: { type: 'radio' }
    },
    onClick: {
      control: false,
      action: 'clicked'
    }
  }
};
