import { Box, Center, Text } from '@chakra-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React from 'react';

import { SimpleModalHead as SimpleModalHeadKit } from '@cosmology-ui/utils';

const Template: ComponentStory<typeof SimpleModalHeadKit> = ({ ...args }) => {
  return (
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        h={72}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
      >
        <SimpleModalHeadKit {...args} />
        <Text textAlign="center" p={6}>
          I&apos;m fake modal
        </Text>
      </Box>
    </Center>
  );
};

export const SimpleModalHead = Template.bind({});

export default {
  title: 'Cosmos/kits',
  component: SimpleModalHeadKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple Modal Head
          </Text>
          <Primary />
          <ArgsTable of={SimpleModalHeadKit} />
        </>
      ),
      source: {
        code: `<SimpleModalHead\n  title="your modal header"\n  backButton={true|false}\n  onBack={backFunction}\n  onClose={closeFunction}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    title: 'Select a wallet',
    backButton: false
  },
  argTypes: {
    handleBack: {
      control: false,
      action: 'clicked back button'
    },
    handleClose: {
      control: false,
      action: 'clicked close button'
    }
  }
};
