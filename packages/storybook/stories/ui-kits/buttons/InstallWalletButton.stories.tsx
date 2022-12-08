import { Box, Text } from '@chakra-ui/react';
import { InstallWalletButton as InstallWalletButtonKit } from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import Bowser from 'bowser';
import React, { useEffect, useState } from 'react';
import { FaFirefox } from 'react-icons/fa';
import { GrAndroid, GrApple } from 'react-icons/gr';
import { HiDownload } from 'react-icons/hi';
import { RiAppStoreFill, RiChromeFill } from 'react-icons/ri';

type UserDeviceInfoType = {
  browser: string;
  device: string;
  os: string;
};

const Template: ComponentStory<typeof InstallWalletButtonKit> = ({
  ...args
}) => {
  const [userBrowserInfo, setUserBrowserInfo] = useState<
    UserDeviceInfoType | undefined
  >();

  function handleDeviceIcon({ browser, device, os }: UserDeviceInfoType) {
    switch (device) {
      case 'desktop':
        if (browser === 'chrome') return RiChromeFill;
        if (browser === 'firefix') return FaFirefox;
        if (browser === 'safari') return GrApple;
        return HiDownload;
      case 'tablet':
        if (os === 'android') return GrAndroid;
        if (os === 'ios') return RiAppStoreFill;
        return HiDownload;
      case 'mobile':
        if (os === 'android') return GrAndroid;
        if (os === 'ios') return RiAppStoreFill;
        return HiDownload;
      default:
        return HiDownload;
    }
  }

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setUserBrowserInfo({
      browser: browser.getBrowserName(true),
      device: browser.getPlatformType(true),
      os: browser.getOSName(true)
    });
  }, []);

  return (
    <Box maxW={80} mx="auto" py={16}>
      <InstallWalletButtonKit
        icon={userBrowserInfo && handleDeviceIcon(userBrowserInfo)}
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
            Simple QRCode
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
    buttonText: 'Install Wallet',
    disabled: false
  },
  argTypes: {
    onClick: {
      control: false,
      action: 'clicked'
    }
  }
};
