/* eslint-disable react/prop-types */
import { Box, Center, Text } from '@chakra-ui/react';
import { ConnectModalQRCode } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React from 'react';

const Template: ComponentStory<typeof ConnectModalQRCode> = ({
  description,
  loading,
  ...args
}) => {
  return (
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        pb={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
        opacity={0.85}
      >
        <Box w="full" p={6}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <ConnectModalQRCode
          description={loading ? 'Initializing QRCode...' : description}
          loading={loading}
          {...args}
        />
      </Box>
    </Center>
  );
};

export const connectModalQRCode = Template.bind({});

// to hide controls
connectModalQRCode.parameters = {
  controls: {
    include: ['link', 'description', 'loading']
  }
};

export default {
  title: 'Components/Modals/ConnectModal',
  component: ConnectModalQRCode,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Modal QRCode
          </Text>
          <Primary />
          <ArgsTable of={ConnectModalQRCode} />
        </>
      ),
      source: {
        code: `import { ConnectModalQRCode } from '@cosmology-ui/react';\n\n<ConnectModalQRCode\n  link="wallet link"\n  description='how to connect'\n  qrCodeSize={230}\n  loading={false}\n  className="the class name of qr code"\n  styleProps={objectOfCustomQRCodeStyle}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    link: 'https://cosmoskit.com/',
    description: 'Use wallet app to scan this QRCode',
    loading: false
  }
};
