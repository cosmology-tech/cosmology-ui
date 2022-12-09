import { Box, Center, Text } from '@chakra-ui/react';
import { SimpleDisplayWalletList as SimpleDisplayWalletListKit } from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React, { useRef } from 'react';

import { WalletData } from '../../util/config';

const Template: ComponentStory<typeof SimpleDisplayWalletListKit> = ({
  // eslint-disable-next-line unused-imports/no-unused-vars
  ...args
}) => {
  const initialFocus = useRef<HTMLButtonElement>(null);
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
        <SimpleDisplayWalletListKit
          walletsData={WalletData}
          initialFocus={initialFocus}
        />
      </Box>
    </Center>
  );
};

export const SimpleDisplayWalletList = Template.bind({});

// to hide controls
SimpleDisplayWalletList.parameters = {
  controls: {
    exclude: ['initialFocus', 'walletsData']
  }
};

export default {
  title: 'UIKits/Modals',
  component: SimpleDisplayWalletListKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple Display Wallet List
          </Text>
          <Primary />
          <ArgsTable of={SimpleDisplayWalletListKit} />
        </>
      ),
      source: {
        code: `import { SimpleDisplayWalletList } from '@cosmology-ui/utils';\n\n<SimpleDisplayWalletListKit\n  initialFocus={ref}\n  walletData={[walletList]}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  }
};
