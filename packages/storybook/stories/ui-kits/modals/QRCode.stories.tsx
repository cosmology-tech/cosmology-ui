import { Box, Center, Text, useColorMode } from '@chakra-ui/react';
import { QRCode as QRCodeKit } from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

const Template: ComponentStory<typeof QRCodeKit> = ({ ...args }) => {
  const { colorMode } = useColorMode();
  const [currentTheme, setCurrentTheme] = useState<string>(colorMode);

  useEffect(() => {
    setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');

    window.addEventListener('storage', () => {
      setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');
    });
  }, []);

  return (
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        pb={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
      >
        <Box w="full" p={6}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <QRCodeKit theme={currentTheme} {...args} />
      </Box>
    </Center>
  );
};

export const QRCode = Template.bind({});

// to hide controls
QRCode.parameters = {
  controls: {
    include: ['link', 'description']
  }
};

export default {
  title: 'Components/Modals',
  component: QRCodeKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            QRCode
          </Text>
          <Primary />
          <ArgsTable of={QRCodeKit} />
        </>
      ),
      source: {
        code: `import { QRCode } from '@cosmology-ui/utils';\n\n<QRCode\n  link="wallet link"\n  description='how to connect'\n  qrCodeSize={230}\n  className="the class name of qr code"\n  theme={currentTheme}\n  styleProps={objectOfCustomQRCodeStyle}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    link: 'https://cosmoskit.com/',
    description: 'Use wallet app to scan this QRCode'
  }
};
