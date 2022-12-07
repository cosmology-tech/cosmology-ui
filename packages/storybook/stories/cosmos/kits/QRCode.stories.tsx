import { Box, Center, Text } from '@chakra-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React from 'react';

import { SimpleQRCode as SimpleQRCodeKit } from '@cosmology-ui/utils';

const Template: ComponentStory<typeof SimpleQRCodeKit> = ({ ...args }) => {
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
        <SimpleQRCodeKit {...args} />
      </Box>
    </Center>
  );
};

export const SimpleQRCode = Template.bind({});

export default {
  title: 'Cosmos/kits',
  component: SimpleQRCodeKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple QRCode
          </Text>
          <Primary />
          <ArgsTable of={SimpleQRCodeKit} />
        </>
      ),
      source: {
        code: `<SimpleQRCode\n  link="wallet link"\n  description='how to connect'\n/>`,
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
