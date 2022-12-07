import { Box, Center, Text } from '@chakra-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React from 'react';

import { SimpleInstallWalletButton as SimpleInstallWalletButtonKit } from '@cosmology-ui/utils';

const Template: ComponentStory<typeof SimpleInstallWalletButtonKit> = ({
  icon,
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
      >
        <Box w="full" p={6}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <Box w="full" p={6} py={24}>
          <Text textAlign="center">I&apos;m fake content</Text>
        </Box>
        <SimpleInstallWalletButtonKit {...args} />
      </Box>
    </Center>
  );
};

export const SimpleInstallWalletButton = Template.bind({});

export default {
  title: 'Cosmos/kits',
  component: SimpleInstallWalletButtonKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple QRCode
          </Text>
          <Primary />
          <ArgsTable of={SimpleInstallWalletButtonKit} />
        </>
      ),
      source: {
        code: `<SimpleInstallWalletButton\n  icon={<Icon />}\n  text\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    text: 'Install Wallet',
    disabled: false
  },
  argTypes: {
    icon: {
      control: {
        options: ['chrome', 'firefox', 'android', 'ios'],
        type: 'radio'
      }
    },
    onClick: {
      control: false,
      action: 'clicked'
    }
  }
};
